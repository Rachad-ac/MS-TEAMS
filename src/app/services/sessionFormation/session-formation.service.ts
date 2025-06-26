import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SessionFormationService {
  constructor(protected http : HttpClient) { }

  createSessionFormation(sessionFormation:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}sessionFormations`,sessionFormation)

  }
  updateSessionFormation(sessionFormationId:any, sessionFormation:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}sessionFormations/${sessionFormationId}`,sessionFormation)
  }

  getSessionFormationId(sessionFormationId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}sessionFormations/${sessionFormationId}`)
  }
  getAllSessionFormations(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams()
    if(req){
      if(req?.lieu != undefined && req?.lieu){
        parametres = parametres.append("lieu", req?.lieu);
      }
      if(req?.dateDebut != undefined && req?.dateDebut){
        parametres = parametres.append("dateDebut", req?.dateDebut);
      }
      if(req?.dateFin != undefined && req?.dateFin){
        parametres = parametres.append("dateFin", req?.dateFin);
      }
      if(req?.nombrePlaces != undefined && req?.nombrePlaces){
        parametres = parametres.append("nombrePlaces", req?.nombrePlaces);
      }
      return this.http.get<any>(
        `${environment.baseUrl}sessionFormations/all?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}sessionFormations/all?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  deleteSessionFormation(sessionFormationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}sessionFormations/${sessionFormationId}`, {
      observe: 'response',
    });
  }
}
