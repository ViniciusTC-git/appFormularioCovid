import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortariaPageRoutingModule } from './portaria-routing.module';

import { PortariaPage } from './portaria.page';
import { MaterialModule } from '../../material.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortariaPageRoutingModule,
    MaterialModule
  ],
  declarations: [PortariaPage]
})
export class PortariaPageModule {}
