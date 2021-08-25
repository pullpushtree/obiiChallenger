import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.page.html',
  styleUrls: ['./ship-details.page.scss'],
})
export class ShipDetailsPage implements OnInit {
  shipDetailSpecs = [];
  spaceShipImages: any;
  officerId: any;

  constructor(     
    private storageLocal : StorageService,    
    private router : Router,
    private route : ActivatedRoute
  ) {
    document.body.setAttribute('color-theme', 'dark')
    }

  ngOnInit() { }

  async ionViewWillEnter(){
    let id = this.route.snapshot.paramMap.get('id')
    await this.storageLocal.get('selectedShipObj')     
    .then(res => {      
      if (this.shipDetailSpecs.length == 0)  {        

        console.log("SELETECTED SHIP OBJECT", res)
        this.shipDetailSpecs.push(res);         
      }
    })

    await this.storageLocal.get('selectedShipId')
    .then(res => {
      if( res !== null ) {
        console.log("local ship ID ", res ) 
        this.officerId = res 
      }
    })

    await this.storageLocal.get('spaceship')
    .then(res => {      
      if (res !== null)  {        
        console.log("local STORAGE spaceship Images ", res )  
        this.spaceShipImages = res[id];       
      }      
    })
  }

  async goToPilotDetails( selectedPilot : any , i: string ){   
    // Set up special object that carries index and Pilot details to match Unsplash images index array
    let modifiedSelectedPilotWithIndex = {
      selectedPilot, i
    } 
    await this.storageLocal.set('selectedPilot', modifiedSelectedPilotWithIndex)    
    await this.router.navigate(['/pilot-details/', selectedPilot.name])
  }

   gotToPilotPage() {
    console.log(" gotToPilotPAge was clikced ")
    this.router.navigate(['/pilots'])    
  }

}
