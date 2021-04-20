import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAdminPage } from './home-admin.page';
import { AuthGuard } from 'src/services/auth.guard';

const routes: Routes = [
  {path: '',component: HomeAdminPage},
  {path: 'portaria',loadChildren: () => import('./portaria/portaria.module').then( m => m.PortariaPageModule), canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAdminPageRoutingModule {}
