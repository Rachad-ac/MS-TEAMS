import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultatService {

  constructor(protected http: HttpClient) {}

   createResultat(resultat: any): Observable<any> {
     return this.http.post<any>(`${environment.baseUrl}resultats`, resultat);
   }

   updateResultat(resultatId: any, resultat: any): Observable<any> {
     return this.http.put<any>(`${environment.baseUrl}resultats/${resultatId}`, resultat);
   }

   getResultatById(resultatId: any): Observable<any> {
     return this.http.get<any>(`${environment.baseUrl}resultats/${resultatId}`);
   }

 getAllResultat(req?: any): Observable<any> {
  let params: HttpParams = new HttpParams();

  if (req) {
    if (req.note) {
      params = params.append("note", req.note);
    }
    if (req.commentaire) {
      params = params.append("commentaire", req.commentaire);
    }
    params = params.append("page", req.page ?? 0);
    params = params.append("size", req.size ?? 10);
  } else {
    params = params.append("page", 0);
    params = params.append("size", 100000);
  }

  return this.http.get<any>(`${environment.baseUrl}resultats/all`, { params });
}
   deleteResultat(resultatId: any): Observable<any> {
     return this.http.delete<any>(`${environment.baseUrl}resultats/${resultatId}`, {
       observe: 'response'
     });
   }
}
