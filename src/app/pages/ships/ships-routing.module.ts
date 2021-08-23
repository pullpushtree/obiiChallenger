import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipsPage } from './ships.page';

const routes: Routes = [
  {
    path: '',
    component: ShipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipsPageRoutingModule {}
