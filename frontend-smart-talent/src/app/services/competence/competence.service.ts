import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class competenceService {
constructor(protected http : HttpClient,
            private modalService: NgbModal) { }
  private modalRef?: NgbModalRef;

  open(content: any, size: any = 'xl') {
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      size
    });

    return this.modalRef;
  }

  close() {
    this.modalRef?.close();
  }

  dismiss() {
    this.modalRef?.dismiss();
  }

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
      if (req?.domaineId != undefined && req?.domaineId) {
        parametres = parametres.append('domaineId', req?.domaineId);
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
