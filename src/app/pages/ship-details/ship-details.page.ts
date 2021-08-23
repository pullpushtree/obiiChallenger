import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PopoverController } from '@ionic/angular';
import { SpaceService } from 'src/app/services/space.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.page.html',
  styleUrls: ['./ship-details.page.scss'],
})
export class ShipDetailsPage implements OnInit {
  shipDetailSpecs = [];
  force: string = 'Dark';

  constructor(     
    private storageLocal : StorageService,    
    private router : Router

     ) {
      document.body.setAttribute('color-theme', 'dark')
      }

  ngOnInit() { }

  openPilotList() {
    
    console.log("pilots clicked ")
  }

  async ionViewWillEnter(){
    await this.storageLocal.get('selectedShipObj')     
    .then(res => {      
      if (this.shipDetailSpecs.length == 0)  {        
        this.shipDetailSpecs.push(res);         
      }
    })
  }

  async goToPilotDetails( selectedPilot ){
    await this.storageLocal.set('selectedPilot', selectedPilot)
    await this.router.navigate(['/pilot-details/', selectedPilot.name])
  }

   gotToPilotPage() {
    console.log(" gotToPilotPAge was clikced ")
    this.router.navigate(['/pilots'])    
  }

}
