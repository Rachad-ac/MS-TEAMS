import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface NiveauEtude {
  id: number;
  nom: string;
  commentaire?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NiveauEtudeService {
  constructor(protected http: HttpClient) {}
 
    createNiveauEtude(niveauEtude: any): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}niveau-etude`, niveauEtude);
    }
 
    updateNiveauEtude(niveauEtudeId: any, niveauEtude: any): Observable<any> {
      return this.http.put<any>(`${environment.baseUrl}niveau-etude/${niveauEtudeId}`, niveauEtude);
    }
 
    getNiveauEtudeById(niveauEtudeId: any): Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}niveau-etude/${niveauEtudeId}`);
    }
 
  getAllNiveauEtudes(req?: any): Observable<any> {
   let params: HttpParams = new HttpParams();
    if (req) {
      if (req.nom) {
        params = params.append("nom", req.lieu);
      }
      if (req.commentaire) {
        params = params.append("commentaire", req.commentaire);
      }

       return this.http.get<any>(
        `${environment.baseUrl}niveau-etude/all?page=${req.page}&size=${req.size}`,
        { params }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}niveau-etude/all?page=0&size=100000`,
        { params }
      );
    }
  }

  deleteNiveauEtude(niveauEtudeId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}niveau-etude/${niveauEtudeId}`, {
      observe: 'response'
    });
  }

}
