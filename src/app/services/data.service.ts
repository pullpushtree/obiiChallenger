import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  twitch_client_id = '22s5gyna6kga3dgayj8c5gxb336nu6'
  twitch_client_secret = 'g7toqursbatc7kj4w01zwyek0vn4db'
  //twitchURL = `https://api.twitch.tv/helix/search/categories`;
  //twitchURL = `https://id.twitch.tv/oauth2/authorize?client_id=${this.twitch_client_id}&redirect_uri=http://localhost&response_type=token&scope=viewing_activity_read`  
  twitchURL = `https://id.twitch.tv/oauth2/token`  
  
  constructor(private httpClient: HttpClient, 
    
    ) { }
  getAccessToken(): Observable<any>{
    const opts = { 
      headers : new HttpHeaders ({      
        'Access-Control-Allow-Origin' : 'https//localhost:8100',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': '*'     
      }),
      body : {
        client_id: `${this.twitch_client_id}`,
        client_secret: `Bearer ${this.twitch_client_secret}` ,
        grant_type: 'client_credentials'        
      },
      json:true,
    };
    
    return this.httpClient.post(this.twitchURL, opts)   
  }  

  getRequest(){
      const opts = { 
      headers : new HttpHeaders ({        
        'Client-Id': `${this.twitch_client_id}`, 
        Authorization: `Bearer ${this.getAccessToken()}`       
      })
    };    


    return this.httpClient.get(this.twitchURL, opts)
    .subscribe(res => {
      console.log("res.statusCode ", res)
      //console.log("res.statusCode ", res.access_token)
    
    })    
  }
}
