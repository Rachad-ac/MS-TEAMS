import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Alertes} from "../../../../../util/alerte";
import {EvaluationService} from "../../../../../services/evaluation/evaluation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-detailles-evaluation',
  templateUrl: './detailles-evaluation.component.html',
  styleUrls: ['./detailles-evaluation.component.scss']
})
export class DetaillesEvaluationComponent implements OnInit {

  evaluationToUpdate: any;
  evaluation: any = null;
  evaluationId: any;
  loadingIndicator = true;

  constructor(private activateRoute: ActivatedRoute,
              private modalService: NgbModal,
              private evaluationService: EvaluationService,
             ) {}

  ngOnInit(): void {
    this.getEvaluationById();
  }

  getEvaluationById(){
    const evaluationId = this.activateRoute.snapshot.paramMap.get('id');
    if (evaluationId != null) {
      localStorage.setItem('evaluationId', evaluationId);
    }
    this.evaluationService.getEvaluationById(evaluationId).subscribe({
      next:(data) =>{
        console.log(data);
        this.evaluation = data.payload;
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    });
  }

  openEditEvaluation(content: TemplateRef<any>, evaluation: any): void {
    this.evaluationToUpdate = evaluation;
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
        this.evaluationService.deleteEvaluation(evaluation.id ).subscribe({
          next: () => {
            Alertes.alerteAddSuccess('Suppression réussie');
          },
          error: (err) => {
            Alertes.alerteAddDanger(err?.error?.message || 'Erreur de suppression');
          },
          complete: () => {
            this.getEvaluationById()
          }
        });
      }
    );
  }

  close(): void {
    this.modalService.dismissAll();
    this.getEvaluationById();
  }

}
