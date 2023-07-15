import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grille } from '../models/Grille';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseUrl: string = "http://localhost:7000";
  private urlNewGame: string ="/newgame"
  private urlSolution: string = "/solution";
  private urlVerification : string ="/verification";
  private urlMessage : string ="/message"

  constructor(private _http: HttpClient) { }

 
  createNewGame(): Observable<Grille[]>{
    return this._http.get<Grille[]>(this.baseUrl + this.urlNewGame);    
  }

  getSolution():Observable<Grille>{
    return this._http.get<Grille>(this.baseUrl+this.urlSolution);
  }

  makeVerification(grilles:Grille[]):Observable<Grille>{
    return this._http.post<Grille>(this.baseUrl+this.urlVerification, grilles);
  }

  getMessage():Observable<String>{
    return this._http.get<String>(this.baseUrl+this.urlMessage);
  }
}
