import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class competenceService {
constructor(protected http : HttpClient) { }

  createCompetence(competence:any):Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}competence`,competence)

  }
  updateCompetence(competenceId:any, competence:any):Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}competence/${competenceId}`,competence)
  }

  getCompetenceId(competenceId:any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}competence/${competenceId}`)
  }
  getAllCompetence(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.nom != undefined && req?.nom) {
        parametres = parametres.append('nom', req.nom);
      }
      if (req?.niveau != undefined && req?.niveau) {
        parametres = parametres.append('niveau', req?.niveau);
      }
      if (req?.domaine != undefined && req?.domaine) {
        parametres = parametres.append('domaine', req?.domaine);
      }

      return this.http.get<any>(
        `${environment.baseUrl}competence/all?page=${req.page || 0}&size=${req.size || 10}`,
        { params: parametres }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}competence/all?page=0&size=100000`,
        { params: parametres }
      );
    }
  }

  deleteCompetence(competenceId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}competence/${competenceId}`, {
      observe: 'response',
    });
  }
}