import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpaceService, } from 'src/app/services/space.service';
import { DataService, } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

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

  constructor( 
    private spaceService: SpaceService, 
    private data: DataService,
    private storage: Storage,
    private router: Router
    ) { 
      document.body.setAttribute('color-theme', 'dark')
    }

  async ngOnInit() {
    
    this.spaceService.loadShips().subscribe(res => {      
      this.results = res.results;       
    })

    // TO TWITCH SERVICE GET AUTH TOKEN ACCESS 
    // try {

    //   this.data.getAccessToken().subscribe(res => {
    //     this.accessToken = res 
    //     console.log("twitch ACCESS TOKEN VALUE  : ", res )   

    //   })
    // } catch(err) {
    //   console.log("Twitch ERROR  ", err)
    // }
  }

  async goToSelectedShip( item, id: string ){
    await this.storage.create();
    await this.storage.set('selectedShipId', id)
    await this.storage.set('selectedShipObj', item)
    await this.router.navigate(['/ship-details/', id])
  }
}
