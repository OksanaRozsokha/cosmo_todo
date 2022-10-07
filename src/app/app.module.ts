import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AbstractAuthRepository } from './domain/contracts/auth.repository';
import { AuthRepository } from './data/repositiries/auth.repository';
import { AbstractDBRepository } from './domain/contracts/db.repository';
import { DBRepository } from './data/repositiries/db.repository';

import { AppComponent } from './app.component';
import { SignInPage } from './presentation/pages/sign-in/sign-in.component';
import { TodoBoardPage } from './presentation/pages/todo-board/todo-board.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInPage,
    TodoBoardPage,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [
    {provide: AbstractAuthRepository, useClass: AuthRepository},
    {provide: AbstractDBRepository, useClass: DBRepository},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
