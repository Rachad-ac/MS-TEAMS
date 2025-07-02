import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(protected http: HttpClient) {}

   createCandidat(candidat: any): Observable<any> {
     return this.http.post<any>(`${environment.baseUrl}candidats`, candidat);
   }

   updateCandidat(candidatId: any, candidat: any): Observable<any> {
     return this.http.put<any>(`${environment.baseUrl}candidats/${candidatId}`, candidat);
   }

   getCandidatById(candidatId: any): Observable<any> {
     return this.http.get<any>(`${environment.baseUrl}candidats/${candidatId}`);
   }

 getAllCandidats(req?: any): Observable<any> {
  let params: HttpParams = new HttpParams();

  if (req) {
    if (req.nom) {
      params = params.append("nom", req.nom);
    }
    if (req.prenom) {
      params = params.append("prenom", req.prenom);
    }
    if (req.email) {
      params = params.append("email", req.email);
    }
    if (req.telephone) {
      params = params.append("telephone", req.telephone);
    }
    if (req.dateNaissance) {
      params = params.append("dateNaissance", req.dateNaissance);
    }
    if (req.adresse) {
      params = params.append("adresse", req.adresse);
    }
    if (req.competence) {
      params = params.append("competenceId", req.competenceId);
    }
          
    params = params.append("page", req.page ?? 0);
    params = params.append("size", req.size ?? 10);
  } else {
    params = params.append("page", 0);
    params = params.append("size", 100000);
  }

  return this.http.get<any>(`${environment.baseUrl}candidats/all`, { params });
}


   deleteCandidat(candidatId: any): Observable<any> {
     return this.http.delete<any>(`${environment.baseUrl}candidats/${candidatId}`, {
       observe: 'response'
     });
   }
}
