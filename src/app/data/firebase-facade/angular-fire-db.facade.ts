import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { ToDoEntity } from '../../domain/entities/todo.entity';
import { AngularFireAuthFacade } from './angular-fire-auth.facade';
import { Injectable } from '@angular/core';
import { UserEntity } from '../../domain/entities/user.entity';
import { firstValueFrom, mergeMap, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AngularFireDataBasaFacade {
    constructor(private db: AngularFireDatabase,
                private authfacade: AngularFireAuthFacade) {}

    public  getTodoListfromDB$(): Observable<ToDoEntity[]|null> {
        return this.authfacade.getSignedInUser$().pipe(
            mergeMap((user: UserEntity|null) => {
                if (!user?.uid) return [];
                console.log('USER ID IN DB', user.uid);
                return this.db.list<ToDoEntity>(`tasks/${user?.uid}`).valueChanges()
            })
        );
    }

    public async createTodo(todo: ToDoEntity): Promise<void> {
        let user: UserEntity|null = await this._convertUserObservableToPromise();

        if (user) {
            let dbRef: AngularFireList<ToDoEntity> = this.db.list<ToDoEntity>(`tasks/${user?.uid}`);
            let task = dbRef.push(todo);
            todo.id = task.key;
            return dbRef.update(task.key!, todo);
        }

        // this.authfacade.getSignedInUser$().subscribe((user: UserEntity|null) => {
        //     if (user) {
                // let dbRef: AngularFireList<ToDoEntity> = this.db.list<ToDoEntity>(`tasks/${user?.uid}`);
                // let task = dbRef.push(todo);
                // todo.id = task.key;
                // dbRef.update(task.key!, todo);
        //     }
        // });
    }

    public async updateTodo(todo: ToDoEntity): Promise<void> {
        let user: UserEntity|null = await this._convertUserObservableToPromise();

        if (user) {
            return this.db.list<ToDoEntity>(`tasks/${user?.uid}`).update(todo.id!, todo);
        }
        // this.authfacade.getSignedInUser$().subscribe((user: UserEntity|null) => {
        //     if (user) {
        //         this.db.list<ToDoEntity>(`tasks/${user?.uid}`).update(todo.id!, todo);
        //     }
        // });
    }

    public async removeTodo(todoId: string): Promise<void> {
        let user: UserEntity|null = await this._convertUserObservableToPromise();

        if (user) {
            return this.db.list<ToDoEntity>(`tasks/${user?.uid}`).remove(todoId);
        }
        // this.authfacade.getSignedInUser$().subscribe((user: UserEntity|null) => {
        //     if (user) {
        //         this.db.list<ToDoEntity>(`tasks/${user?.uid}`).remove(todoId);
        //     }
        // });
    }

    private _convertUserObservableToPromise(): Promise<UserEntity|null> {
        return firstValueFrom(this.authfacade.getSignedInUser$());
    }
}