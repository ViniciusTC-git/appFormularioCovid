import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarEmailPageRoutingModule } from './verificar-email-routing.module';

import { VerificarEmailPage } from './verificar-email.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarEmailPageRoutingModule,
    MaterialModule
  ],
  declarations: [VerificarEmailPage]
})
export class VerificarEmailPageModule {}
