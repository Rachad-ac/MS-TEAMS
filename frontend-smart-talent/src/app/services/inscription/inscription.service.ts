import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InscriptionService {
  private apiUrl = environment.baseUrl + 'inscriptions';

  constructor(private http: HttpClient) {}

  getAllInscriptions(params: any = {}): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get<any>(`${this.apiUrl}/search`, { params: httpParams });
  }

  createInscription(inscription: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, inscription);
  }

  updateInscription(id: number, inscription: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, inscription);
  }

  deleteInscription(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getInscriptionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
