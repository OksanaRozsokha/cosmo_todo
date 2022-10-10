import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './presentation/guards/auth-guard/auth.guard';
import { NotAuthGuard } from './presentation/guards/not-auth-guard/not-auth.guard';
import { SignInPage } from './presentation/pages/sign-in-page/sign-in.component';
import { TodoPage } from './presentation/pages/todo-page/todo-page.component';
import { RouterConstants } from './common/constants/router.constants';

const routes: Routes = [
  { path: '', redirectTo: RouterConstants.signInPage, pathMatch: 'full'},
  { path: RouterConstants.signInPage, component: SignInPage, canActivate: [NotAuthGuard] },
  { path: RouterConstants.todoBoardPage, component: TodoPage, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
