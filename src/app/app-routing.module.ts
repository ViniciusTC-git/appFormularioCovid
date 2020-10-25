import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard'

const routes: Routes = [
  {path: '', redirectTo: 'Login', pathMatch: 'full' },
  {path:'Home',loadChildren:() => import('./home/home.module').then(m => m.HomePageModule),canActivate: [AuthGuard]},
<<<<<<< HEAD
=======
  {path: 'HomeAdmin',loadChildren: () => import('./home-admin/home-admin.module').then( m => m.HomeAdminPageModule)},
>>>>>>> fb6230853c07904e51e06a4c0a27b743af625cbc
  {path: 'Login',loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)}
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
