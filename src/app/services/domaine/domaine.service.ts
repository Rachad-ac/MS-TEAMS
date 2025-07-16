import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  constructor(protected http : HttpClient) { }

  createDomaine(domaine:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}domaines`,domaine)

  }
  updateDomaine(domaineId:any, domaine:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}domaines/${domaineId}`,domaine)
  }

  getDomaineId(domaineId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}domaines/${domaineId}`)
  }
  getAllDomaines(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.nom != undefined && req?.nom) {
        parametres = parametres.append('nom', req.nom);
      }
      if (req?.description != undefined && req?.description) {
        parametres = parametres.append('description', req.description);
      }
      return this.http.get<any>(
        `${environment.baseUrl}domaines/all?page=${req.page || 0}&size=${req.size || 10}`,
        { params: parametres }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}domaines/all?page=0&size=100000`,
        { params: parametres }
      );
    }
  }

  deleteDomaine(domaineId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}domaines/${domaineId}`, {
      observe: 'response',
    });
  }
}
