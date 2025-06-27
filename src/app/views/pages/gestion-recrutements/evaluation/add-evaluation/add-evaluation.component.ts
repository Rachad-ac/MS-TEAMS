import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { Alertes } from 'src/app/util/alerte';


@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.scss']
})
export class AddEvaluationComponent implements OnInit {

  statutList = [
  { label: 'Prévue', value: 'PREVUE' },
  { label: 'En cours', value: 'EN_COURS' },
  { label: 'Terminée', value: 'TERMINEE' },
  { label: 'Annulée', value: 'ANNULEE' }
];

typeList = [
  { label: 'Test', value: 'TEST' },
  { label: 'Entretien', value: 'ENTRETIEN' },
  { label: 'Autre', value: 'AUTRE' }
];

form!: FormGroup;
@Output() submit: EventEmitter<boolean> = new EventEmitter();
@Output() search: EventEmitter<boolean> = new EventEmitter();
@Input() evaluationToUpdate: any;
@Input() isSearch: any;

  constructor(
    private modalService: NgbModal,
    private evaluationService: EvaluationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      type: new FormControl('', Validators.required),
      score: new FormControl('', [Validators.required, Validators.min(0)]),
      noteGenerale: new FormControl('', Validators.required),
      commentaire: new FormControl('', Validators.maxLength(500)),
      dateEvaluation: new FormControl('', Validators.required),
      recruteur: new FormControl('', Validators.required),
      statut: new FormControl('', Validators.required)
    });
  }

  create(): void {
    const evaluation = this.form.value;
    this.evaluationService.createEvaluation(evaluation).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Évaluation ajoutée avec succès');
        this.emitSubmit();
      },
      error: (err) => {
        Alertes.alerteAddDanger(err.error.message || 'Erreur lors de l’ajout');
      },
      complete: () => {
        this.close();
      }
    });
  }

  doSearch(): void {
    this.search.emit(this.form.value);
  }

  emitSubmit(): void {
    this.submit.emit(true);
  }

  close(): void {
    this.modalService.dismissAll();
  }
}

