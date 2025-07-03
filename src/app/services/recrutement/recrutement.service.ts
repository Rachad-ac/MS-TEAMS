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
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.titre != undefined && req?.titre) {
        parametres = parametres.append('titre', req.titre);
      }
      if (req?.dateLimite != undefined && req?.dateLimite) {
        parametres = parametres.append('dateLimite', req.dateLimite);
      }
      if (req?.lieu != undefined && req?.lieu) {
        parametres = parametres.append('lieu', req.lieu);
      }
      if (req?.typeContrat != undefined && req?.typeContrat) {
        parametres = parametres.append('typeContrat', req?.typeContrat);
      }
      if (req?.salaire != undefined && req?.salaire) {
        parametres = parametres.append('salaire', req?.salaire.toString());
      }
      if (req?.domaine != undefined && req?.domaine) {
        parametres = parametres.append('domaine', req?.domaine);
      }
      if (req?.publier != undefined && req?.publier) {
        parametres = parametres.append('publier', req.publier.toString());
      }

      if (req?.competence != undefined && req?.competence) {
        parametres = parametres.append('competence', req.competence.toString());
      }

      return this.http.get<any>(
        `${environment.baseUrl}recrutements/all?page=${req.page || 0}&size=${req.size || 10}`,
        { params: parametres }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}recrutements/all?page=0&size=100000`,
        { params: parametres }
      );
    }
  }

  deleteRecrutement(recrutementId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}recrutements/${recrutementId}`, {
      observe: 'response',
    });
  }
}

export class RecruteuementService {
}
