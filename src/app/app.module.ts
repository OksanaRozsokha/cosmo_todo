import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AbstractAuthRepository } from './domain/contracts/auth.repository';
import { AuthRepository } from './data/repositiries/auth-repository/auth.repository';
import { AbstractDBRepository } from './domain/contracts/db.repository';
import { DBRepository } from './data/repositiries/db-repository/db.repository';

import { AppComponent } from './app.component';
import { SignInPage } from './presentation/pages/sign-in-page/sign-in.component';
import { HeaderComponent } from './presentation/pages/todo-page/components/header/header.component';
import { TodoPage } from './presentation/pages/todo-page/todo-page.component';
import { TodoBoardComponent } from './presentation/pages/todo-page/components/todo-board/todo-board.component';
import { IconComponent } from './presentation/shared/components/icon/icon.component';
import { PopupComponent } from './presentation/shared/components/popup/popup.component';
import { TodoItemComponent } from './presentation/pages/todo-page/components/todo-item/todo-item.component';
import { TodoItemSmComponent } from './presentation/pages/todo-page/components/todo-item-sm/todo-item-sm.component';

import { StopPropagationDirective } from './presentation/shared/directives/stop-propagation/stop-propagation.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SortByIndexPipe } from './presentation/shared/pipes/sort-by-index/sort-by-index.pipe';
@NgModule({
  declarations: [
    AppComponent,
    SignInPage,
    HeaderComponent,
    TodoPage,
    TodoBoardComponent,
    IconComponent,
    PopupComponent,
    TodoItemComponent,
    TodoItemSmComponent,
    StopPropagationDirective,
    SortByIndexPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    DragDropModule
  ],
  providers: [
    {provide: AbstractAuthRepository, useClass: AuthRepository},
    {provide: AbstractDBRepository, useClass: DBRepository},
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
