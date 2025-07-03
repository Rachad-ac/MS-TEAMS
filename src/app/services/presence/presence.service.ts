import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(protected http: HttpClient) {}

   createPresence(presence: any): Observable<any> {
     return this.http.post<any>(`${environment.baseUrl}presences`, presence);
   }

   updatePresence(presenceId: any, presence: any): Observable<any> {
     return this.http.put<any>(`${environment.baseUrl}presences/${presenceId}`, presence);
   }

   getPresenceById(presenceId: any): Observable<any> {
     return this.http.get<any>(`${environment.baseUrl}presences/${presenceId}`);
   }

 getAllPresence(req?: any): Observable<any> {
  let params: HttpParams = new HttpParams();

  if (req) {
    if (req.statutPresence) {
      params = params.append("statutPresence", req.statutPresence);
    }
    if (req.justification) {
      params = params.append("justification", req.justification);
    }
    params = params.append("page", req.page ?? 0);
    params = params.append("size", req.size ?? 10);
  } else {
    params = params.append("page", 0);
    params = params.append("size", 100000);
  }

  return this.http.get<any>(`${environment.baseUrl}presences/all`, { params });
}
   deletePresence(presenceId: any): Observable<any> {
     return this.http.delete<any>(`${environment.baseUrl}presences/${presenceId}`, {
       observe: 'response'
     });
   }
}
