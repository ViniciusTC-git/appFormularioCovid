import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/services/auth.guard';

import { LoginPage } from './login.page';

const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'verificar-email', loadChildren: () => import('./verificar-email/verificar-email.module').then( m => m.VerificarEmailPageModule), canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
