import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { ToDoEntity } from '../../domain/entities/todo.entity';
import { AngularFireAuthFacade } from './angular-fire-auth.facade';
import { Injectable } from '@angular/core';
import { UserEntity } from '../../domain/entities/user.entity';
import { mergeMap, Observable } from 'rxjs';

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

    public createTodo(todo: ToDoEntity): void {
        this.authfacade.getSignedInUser$().subscribe((user: UserEntity|null) => {
            if (user) {
                let dbRef: AngularFireList<ToDoEntity> = this.db.list<ToDoEntity>(`tasks/${user?.uid}`);
                let task = dbRef.push(todo);
                todo.id = task.key;
                dbRef.update(task.key!, todo);
            }
        });
    }

    public updateTodo(todo: ToDoEntity): void {
        this.authfacade.getSignedInUser$().subscribe((user: UserEntity|null) => {
            if (user) {
                this.db.list<ToDoEntity>(`tasks/${user?.uid}`).update(todo.id!, todo);
            }
        });
    }

    public removeTodo(todoId: string): void {
        this.authfacade.getSignedInUser$().subscribe((user: UserEntity|null) => {
            if (user) {
                this.db.list<ToDoEntity>(`tasks/${user?.uid}`).remove(todoId);
            }
        });
    }
}