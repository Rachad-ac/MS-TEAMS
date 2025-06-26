import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecrutementService {
  constructor(protected http : HttpClient) { }

  createRecrutement(recrutement:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}recrutements`,recrutement)

  }
  updateRecrutement(recrutementId:any, recrutement:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}recrutements/${recrutementId}`,recrutement)
  }

  getRecrutementId(recrutementId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}recrutements/${recrutementId}`)
  }
  getAllRecrutements(req?: any): Observable<any> {
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
        `${environment.baseUrl}recrutements/all?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}recrutements/all?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }

  deleteRecrutement(recrutementId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}recrutements/${recrutementId}`, {
      observe: 'response',
    });
  }
}
