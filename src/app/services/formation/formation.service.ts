import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormationService {
  private apiUrl = '/api/formations';

  constructor(private http: HttpClient) {}

  getAllFormations(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
} 