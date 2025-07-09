import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from "../../../../../services/evaluation/evaluation.service";
import {Alertes} from "../../../../../util/alerte";

@Component({
  selector: 'app-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.scss']
})
export class ListEvaluationComponent implements OnInit {

  displayedColumns : string[] = [
    'type',
    'score',
    'noteGenerale',
    'commentaire',
    'dateEvaluation',
    'recruteur',
    'statut',
    'detailles',
    'actions'
  ];

  evaluationToUpdate: any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private evaluationServices: EvaluationService
  ) { }

  ngOnInit(): void {
    this.getAllEvaluations();
  }

  getAllEvaluations(): void {
    this.evaluationServices.getAllEvaluations(this.pageOptions).subscribe({
      next: response => {
        console.log('response', response);
        this.dataSource = response;
        this.loadingIndicator = false;
      },
      error: err => {
        console.error(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  paginate($event: number): void {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllEvaluations();
  }

  openAddEvaluation(content: TemplateRef<any>): void {
    this.openModal(content, 'lg');
  }

  openEditEvaluation(content: TemplateRef<any>, rEvaluation: any): void {
    this.evaluationToUpdate = rEvaluation;
    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: 'sm' | 'lg' | 'xl'): void {
    this.modalService.open(content, { size, backdrop: 'static' }).result.then(
      () => {},
      () => {}
    );
  }

  deleteEvaluation(evaluation: any): void {
    Alertes.confirmAction(
      'Voulez-vous supprimer ?',
      'Cet élément sera définitivement supprimé',
      () => {
        this.evaluationServices.deleteEvaluation(evaluation).subscribe({
          next: () => {
            Alertes.alerteAddSuccess('Suppression réussie');
          },
          error: (err) => {
            Alertes.alerteAddDanger(err?.error?.message || 'Erreur de suppression');
          },
          complete: () => {
            this.getAllEvaluations();
          }
        });
      }
    );
  }

  close(): void {
    this.modalService.dismissAll();
    this.getAllEvaluations();
  }

  doSearch(data: any): void {
    this.pageOptions = {
      ...data,
      page: 0,
      size: 20
    };
    console.log("Filtres appliqués : ", this.pageOptions);
    this.getAllEvaluations();
    this.modalService.dismissAll();
  }
}
