import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PilotDetailsPage } from './pilot-details.page';

const routes: Routes = [
  {
    path: '',
    component: PilotDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PilotDetailsPageRoutingModule {}
