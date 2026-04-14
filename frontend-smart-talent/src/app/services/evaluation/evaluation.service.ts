import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(protected http: HttpClient) {}

  createEvaluation(evaluation: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}evaluations`, evaluation);
  }

  updateEvaluation(evaluationId: any, evaluation: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}evaluations/${evaluationId}`, evaluation);
  }

  getEvaluationById(evaluationId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}evaluations/${evaluationId}`);
  }

  getAllEvaluations(req?: any): Observable<any> {
    let params: HttpParams = new HttpParams();

    if (req) {
      if (req.lieu) {
        params = params.append("lieu", req.lieu);
      }
      if (req.dateDebut) {
        params = params.append("dateDebut", req.dateDebut);
      }
      if (req.dateFin) {
        params = params.append("dateFin", req.dateFin);
      }
      if (req.titre) {
        params = params.append("titre", req.titre);
      }
      if (req.type) {
        params = params.append("type", req.type);
      }

      return this.http.get<any>(
        `${environment.baseUrl}evaluations/all?page=${req.page}&size=${req.size}`,
        { params }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}evaluations/all?page=0&size=100000`,
        { params }
      );
    }
  }

  deleteEvaluation(evaluationId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}evaluations/${evaluationId}`, {
      observe: 'response'
    });
  }
}
