import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  constructor(protected http : HttpClient) { }

  createFormation(formation:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}formations`,formation)

  }
  updateFormation(formationId:any, formation:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}formations/${formationId}`,formation)
  }

  getFormationId(formationId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}formations/${formationId}`)
  }
  getAllFormations(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.titre != undefined && req?.titre) {
        parametres = parametres.append('titre', req.titre);
      }

      if (req?.objectif != undefined && req?.objectif) {
        parametres = parametres.append('objectif', req.objectif);
      }

      if (req?.dateDebut != undefined && req?.dateDebut) {
        parametres = parametres.append('dateDebut', req.dateDebut.toString());
      }

      if (req?.dateFin != undefined && req?.dateFin) {
        parametres = parametres.append('dateFin', req.dateFin.toString());
      }

      if (req?.niveau != undefined && req?.niveau) {
        parametres = parametres.append('niveau', req.niveau.toString());
      }

      if (req?.statut != undefined && req?.statut) {
        parametres = parametres.append('statut', req.statut.toString());
      }

      return this.http.get<any>(
        `${environment.baseUrl}formations/all?page=${req.page || 0}&size=${req.size || 10}`,
        { params: parametres }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}formations/all?page=0&size=100000`,
        { params: parametres }
      );
    }
  }

  deleteFormation(formationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}formations/${formationId}`, {
      observe: 'response',
    });
  }
}
