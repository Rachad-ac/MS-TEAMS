import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  constructor(protected http: HttpClient) {}

  createEmploye(employe: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}employe`, employe);
  }

  updateEmploye(employeId: any, employe: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}employe/${employeId}`, employe)
  }

  getEmployeId(employeId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}employe/${employeId}`)
  }

  getAllEmploye(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();

    if (req) {
      if (req?.nom != undefined && req?.nom) {
        parametres = parametres.append('nom', req.nom);
      }
      if (req?.prenom != undefined && req?.prenom) {
        parametres = parametres.append('prenom', req?.prenom);
      }
      if (req?.email != undefined && req?.email) {
        parametres = parametres.append('email', req?.email);
      }
      if (req?.telephone != undefined && req?.telephone) {
        parametres = parametres.append('telephone', req?.telephone);
      }
      if (req?.poste != undefined && req?.poste) {
        parametres = parametres.append('poste', req?.poste);
      }
      if (req?.departement != undefined && req?.departement) {
        parametres = parametres.append('departement', req?.departement);
      }
      if (req?.sexe != undefined && req?.sexe) {
        parametres = parametres.append('sexe', req?.sexe);
      }
      if (req?.sexe != undefined && req?.dateEmbauche) {
        parametres = parametres.append('dateEmbauche', req?.dateEmbauche);
      }
      if (req?.sexe != undefined && req?.role) {
        parametres = parametres.append('role', req?.role);
      }
      return this.http.get<any>(
        `${environment.baseUrl}employe/all?page=${req.page}&size=${req.size}`,
        { params: parametres}
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}employe/all?page=0&size=100000`,
        {params: parametres}
      );
    }
  }
  deleteEmploye(employeId : any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}employe/${employeId}`, {
      observe: 'response',
    });
  }
}



