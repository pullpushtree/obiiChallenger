import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { concatAll, map, switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

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

  constructor( private http : HttpClient, private storageLocal : StorageService ) {
    
   } 

  loadShips(): Observable<any> {
    return this.http.get(`${this.url}/starships`)
    .pipe(
      map( results => {
        console.log(" MASTER OBJECT  ", results) 

       let spaceShipDMV = results['results']
       spaceShipDMV.map( spaceShip => {  
         
        this.lookupFilmsURLArray(spaceShip['films'])          
        this.lookupPilotsURLArray(spaceShip['pilots'])

       })

        results['results']
        .map(spaceShip => {          
          let flightCrew = spaceShip['pilots']
          if(flightCrew.length > 0 ){
            console.log("flightCrew", flightCrew)
            flightCrew.forEach( crewId => this.getURLDetails(crewId))
          }
        })
        return results        
      })
    )
  }

  lookupPilotsURLArray(spaceShipObj){
    let flightCrew = spaceShipObj
    if(flightCrew.length > 0 ) {
      flightCrew.map(rawURL => {

        this.getURLDetails(rawURL)
        .subscribe(pilotObject => {

          let index = flightCrew.indexOf(rawURL);
          let item = pilotObject;          
          flightCrew.splice(index,1,item);
          
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
          console.log("Film no " + films.indexOf(rawURL) + " " + filmObj['title'])
          let index = films.indexOf(rawURL)
          let item = filmObj['title']
          films.splice(index, 1, item)             
        })
      })
    }   
  }

  getURLDetails(url){
    return this.http.get(url)
  }
}
