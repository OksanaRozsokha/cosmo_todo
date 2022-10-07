import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './presentation/guards/auth-guard/auth.guard';
import { SignInPage } from './presentation/pages/sign-in/sign-in.component';
import { TodoBoardPage } from './presentation/pages/todo-board/todo-board.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInPage },
  { path: 'todo-board', component: TodoBoardPage, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
