import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  {
    path: '', 
    redirectTo: 'ships',
    pathMatch: 'full'
  },
  {
    path: 'ships',
    loadChildren: () => import('./pages/ships/ships.module').then( m => m.ShipsPageModule)
  },
  {
    path: 'ship-details/:id',
    loadChildren: () => import('./pages/ship-details/ship-details.module').then( m => m.ShipDetailsPageModule)
  },  
  {
    path: 'pilot-details/:id',
    loadChildren: () => import('./pages/pilot-details/pilot-details.module').then( m => m.PilotDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
