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
  jediImages: any;
  id: Promise<any>;
  

  constructor(
    private storageLocal : StorageService,     
    public el: ElementRef,
    ) {
    document.body.setAttribute('color-theme', 'dark')
   }

  ngOnInit() {    
    // initializing card swivel motion effect 
    VanillaTilt.init(this.el.nativeElement.lastChild, { 
      glare: true,       
      "max-glare": 0.5,
      scale: 1, 
      max: 25, 
      speed: 400 
    });
  }

  async ionViewWillEnter(){
    this.id = this.storageLocal.get('selectedPilotId')  
    
    // Get selected Pilot object
    await this.storageLocal.get('selectedPilot')     
    .then(res => {
      if (this.pilotDetailSpecs.length == 0)  {  
        // Set up object used to display the selected pilot details
        this.pilotDetailSpecs.push(res['selectedPilot']);       
      }      
    })
    
    //Get Jedi image Array
    await this.storageLocal.get('jedi')
    .then(res => {      
      if (res !== null)  {
        // Get a random number to select the index image to display  
        let id = Math.floor(Math.random() * res.length) 
          this.jediImages = res[id];           
      }
    })

  }
}
