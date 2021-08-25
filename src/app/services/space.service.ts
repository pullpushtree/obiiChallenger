import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType {  
  people = 'people',
  starships = 'starships',
}

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  url = 'https://swapi.dev/api'; 
  flightCrew: any;
  flightCrewMember: any[];  

  constructor( private http : HttpClient ) {
    
   } 

   // Look up Ship details including Film and Pilot array
  loadShips(): Observable<any> {
    return this.http.get(`${this.url}/starships`)
    .pipe(
      map( results => {
        console.log(" MASTER OBJECT  ", results) 

       let spaceShipDMV = results['results']
       spaceShipDMV.map( spaceShip => {
         this.lookupPilotsURLArray(spaceShip['pilots'])
         this.lookupFilmsURLArray(spaceShip['films'])
       })

        results['results'].map(spaceShip => {          
          let flightCrew = spaceShip['pilots']
          if(flightCrew.length > 0 ){
            flightCrew.forEach( crewId => {
              this.getURLDetails(crewId)
            })
          }
        })
       
        return results        
      })
    )
  }

  lookupPilotsURLArray(spaceShipObj: any){
    let flightCrew = spaceShipObj
    if(flightCrew.length > 0 ) {
      flightCrew.map(rawURL => {
        this.getURLDetails(rawURL)
        .subscribe(pilotObject => {
          let index = flightCrew.indexOf(rawURL);
          let item = pilotObject;
          flightCrew.splice(index,1,item);

          return pilotObject;
        })
      })
    }
  }

  lookupFilmsURLArray(filmObj:any) {
    let films = filmObj
    if(films.length > 0) {
      films.map(rawURL => {
        this.getURLDetails(rawURL)
        .subscribe(filmObj => {
          let index = films.indexOf(rawURL)
          let item = filmObj['title']
          films.splice(index, 1, item)  
          return filmObj           
        })
      })
    }   
  }
  
  getURLDetails(url){
    return this.http.get(url)
  }
}
