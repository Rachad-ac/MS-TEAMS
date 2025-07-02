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
    return this.http.post<any>(`${environment.baseUrl}session-formations`,sessionFormation)

  }
  updateSessionFormation(sessionFormationId:any, sessionFormation:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}session-formations/${sessionFormationId}`,sessionFormation)
  }

  getSessionFormationId(sessionFormationId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}session-formations/${sessionFormationId}`)
  }
  getAllSessionFormations(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams()
    if(req){
      if (req?.formationId != undefined && req?.formationId) {
        parametres = parametres.append('formationId', req.formationId);
      }
      if(req?.lieu != undefined && req?.lieu){
        parametres = parametres.append("lieu", req?.lieu);
      }
      if(req?.date != undefined && req?.date){
        parametres = parametres.append("date", req?.date);
      }
      if(req?.formation != undefined && req?.formation){
        parametres = parametres.append("formation", req?.formation);
      }
      return this.http.get<any>(
        `${environment.baseUrl}session-formations/all?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}session-formations/all?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  deleteSessionFormation(sessionFormationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}session-formations/${sessionFormationId}`, {
      observe: 'response',
    });
  }
}
