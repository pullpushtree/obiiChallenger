import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShipDetailsPageRoutingModule } from './ship-details-routing.module';

import { ShipDetailsPage } from './ship-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShipDetailsPageRoutingModule
  ],
  declarations: [ShipDetailsPage]
})
export class ShipDetailsPageModule {}
