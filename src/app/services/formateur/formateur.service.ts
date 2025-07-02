import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  constructor(protected http : HttpClient) { }

  createFormateur(formateur:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}formateurs`,formateur)

  }
  updateFormateur(formateurId:any, formateur:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}formateurs/${formateurId}`,formateur)
  }

  getFormateurId(formateurId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}formateurs/${formateurId}`)
  }
  getAllFormateurs(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.nom != undefined && req?.nom) {
        parametres = parametres.append('Nom', req.nom);
      }
      if (req?.prenom != undefined && req?.prenom) {
        parametres = parametres.append('Prenom', req.prenom);
      }
      if (req?.email != undefined && req?.email) {
        parametres = parametres.append('Email', req.email);
      }
      if (req?.type!= undefined && req?.type) {
        parametres = parametres.append('Type', req?.type);
      }
      if (req?.specialites != undefined && req?.specialites) {
         parametres = parametres.append('Specialites', req?.specialites);
      }


      return this.http.get<any>(
        `${environment.baseUrl}formateurs/all?page=${req.page || 0}&size=${req.size || 10}`,
        { params: parametres }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}formateurs/all?page=0&size=100000`,
        { params: parametres }
      );
    }
  }

  deleteFormateur(formateurId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}formateurs/${formateurId}`, {
      observe: 'response',
    });
  }
}
