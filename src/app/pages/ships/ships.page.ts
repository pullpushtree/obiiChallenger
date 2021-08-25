import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpaceService, } from 'src/app/services/space.service';
import { DataService, } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.page.html',
  styleUrls: ['./ships.page.scss'],
})
export class ShipsPage implements OnInit {
  results: Observable<any>;  
  accessToken: any;
  force: string = 'Dark';
  downloadStatus: number = 0;  
  unsplashImages: any;
  shipImages: any;

  constructor( 
    private spaceService: SpaceService, 
    private data: DataService,
    private storageLocal: StorageService,
    private router: Router
    ) { 
      document.body.setAttribute('color-theme', 'dark')
    }

  async ngOnInit() {
    this.spaceService.loadShips().subscribe(res => {      
      this.results = res.results;
    })

    //Initialize Unsplash API request 
    this.data.unsplashAPIRequest();
  }

  ionViewWillEnter(){
    
    this.storageLocal.get('spaceship').then(res => {
      this.shipImages = res
    })  
  }

  async goToSelectedShip( item, id: string ){
    await this.storageLocal.init();
    await this.storageLocal.set('selectedShipId', id)
    await this.storageLocal.set('selectedShipObj', item)
    await this.router.navigate(['/ship-details/', id])
  }
}
