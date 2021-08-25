import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  constructor(private httpClient: HttpClient, 
    private storageLocal: StorageService
    ) { }

    unsplashAPIRequest(): Observable<any> {

      // Get images need for spaceship and pilot card
      const client_id = 'n4R3HXbIifKaDJGDNN-2NhP7jd5p0XT7alYYDVwVhok'
      let query1 = 'spaceship'
      let query2 = 'jedi'
      let urlQ1 = `https://api.unsplash.com/search/photos/?client_id=${client_id}&query=${query1}`;
      let urlQ2 = `https://api.unsplash.com/search/photos/?client_id=${client_id}&query=${query2}`;      
      
      this.httpClient.get(urlQ1).subscribe(searchedTermCollection => {
        const spaceShipImages = [];
        const imgAr = searchedTermCollection['results']
        imgAr.map( res => {
          spaceShipImages.push(res['urls']['regular'])
          
          // console.log("spaceShipImages[]", spaceShipImages )
          this.storageLocal.set('spaceship', spaceShipImages)
          return res['urls']['regular']
        })
      })

      this.httpClient.get(urlQ2).subscribe(searchedTermCollection => {
        const jediImages = [];
        const imgAr = searchedTermCollection['results']
        imgAr.map( res => {
          jediImages.push(res['urls']['regular'])
          
          // console.log("jediImages[]", jediImages ) 
          this.storageLocal.set('jedi', jediImages)
          return res['urls']['regular']
        })
      })
      return
    }

}
      
    

