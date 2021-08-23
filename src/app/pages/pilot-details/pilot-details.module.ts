import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PilotDetailsPageRoutingModule } from './pilot-details-routing.module';

import { PilotDetailsPage } from './pilot-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PilotDetailsPageRoutingModule
  ],
  declarations: [PilotDetailsPage]
})
export class PilotDetailsPageModule {}
