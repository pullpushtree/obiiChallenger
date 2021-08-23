import { Component, OnInit, ElementRef } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import VanillaTilt from 'vanilla-tilt';


@Component({
  selector: 'app-pilot-details',
  templateUrl: './pilot-details.page.html',
  styleUrls: ['./pilot-details.page.scss'],
})
export class PilotDetailsPage implements OnInit {
  pilotDetailSpecs = [];
  

  constructor(
    private storageLocal : StorageService,     
    public el: ElementRef
    ) {
    document.body.setAttribute('color-theme', 'dark')
   }

  ngOnInit() {    
    VanillaTilt.init(this.el.nativeElement.lastChild, { 
      glare: true,       
      "max-glare": 0.5,
      scale: 1, 
      max: 25, 
      speed: 400 
    });
  }

  async ionViewWillEnter(){
    await this.storageLocal.get('selectedPilot')     
    .then(res => {
      if (this.pilotDetailSpecs.length == 0)  {        
        console.log("pilot details ", res )  
        this.pilotDetailSpecs.push(res);       
      }      
    })
  }

}
