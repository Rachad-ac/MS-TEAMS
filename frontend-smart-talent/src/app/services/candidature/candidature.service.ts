import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CandidatureService {
  // Service Angular pour gérer les appels API liés aux candidatures
  constructor(protected http: HttpClient) {}

  /**
   * Crée une nouvelle candidature
   * @param candidature Données de la candidature à créer
   */
  createCandidature(candidature: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}candidatures`,
      candidature
    );
  }

  /**
   * Met à jour une candidature existante
   * @param candidatureId ID de la candidature à modifier
   * @param candidature Données modifiées
   */
  updateCandidature(candidatureId: any, candidature: any): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl}candidatures/${candidatureId}`,
      candidature
    );
  }

  /**
   * Récupère une candidature par son ID
   * @param candidatureId ID de la candidature
   */
  getCandidatureId(candidatureId: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}candidatures/${candidatureId}`
    );
  }

  /**
   * Récupère la liste paginée/filtrée des candidatures
   * @param req Filtres et pagination (statut, recrutementId, candidatId, page, size)
   */
  getAllCandidatures(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    if (req) {
      if (req?.statut != undefined && req?.statut) {
        parametres = parametres.append('statut', req?.statut);
      }
      if (req?.recrutementId != undefined && req?.recrutementId) {
        parametres = parametres.append('recrutementId', req?.recrutementId);
      }
      if (req?.candidatId != undefined && req?.candidatId) {
        parametres = parametres.append('candidatId', req?.candidatId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}candidatures/all?page=${req?.page}&size=${req?.size}`,
        {
          params: parametres,
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}candidatures/all?page=${0}&size=${100000}`,
        {
          params: parametres,
        }
      );
    }
  }

  /**
   * Supprime une candidature par son ID
   * @param candidatureId ID de la candidature à supprimer
   */
  deleteCandidature(candidatureId: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseUrl}candidatures/${candidatureId}`,
      {
        observe: 'response',
      }
    );
  }
}
