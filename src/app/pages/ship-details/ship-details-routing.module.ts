import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipDetailsPage } from './ship-details.page';

const routes: Routes = [
  {
    path: '',
    component: ShipDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipDetailsPageRoutingModule {}
