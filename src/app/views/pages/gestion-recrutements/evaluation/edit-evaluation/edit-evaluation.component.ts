import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-edit-evaluation',
  templateUrl: './edit-evaluation.component.html',
  styleUrls: ['./edit-evaluation.component.scss']
})
export class EditEvaluationComponent {

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
      this.loadFileds()
    }
  
  initForm() {
    this.form = new FormGroup({
      type: new FormControl('', Validators.required),
      score: new FormControl('', [Validators.required, Validators.min(0)]),
      noteGenerale: new FormControl('', Validators.required),
      commentaire: new FormControl('', Validators.maxLength(500)),
      dateEvaluation : new FormControl('', Validators.required),
      recruteur: new FormControl('', Validators.required),
      statut: new FormControl('', Validators.required)
    });
  }

  loadFileds() {
    if (this.evaluationToUpdate !== undefined) {
      this.form?.get('type')?.setValue(this.evaluationToUpdate?.type?.name);
      this.form?.get('score')?.setValue(this.evaluationToUpdate?.score);
      this.form?.get('noteGenerale')?.setValue(this.evaluationToUpdate.noteGenerale);
      this.form?.get('commentaire')?.setValue(this.evaluationToUpdate.commentaire);
      this.form?.get('dateEvaluation')?.setValue(Helper.editDate(this.evaluationToUpdate?.dateEvaluation));
      this.form?.get('recruteur')?.setValue(this.evaluationToUpdate?.recruteur);
      this.form?.get('statut')?.setValue(this.evaluationToUpdate?.statut?.name);
    }
  }

  update() {
    let evaluation = this.form.value;
    this.evaluationService.updateEvaluation(this.evaluationToUpdate?.id, evaluation).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message)
      },
      complete: () => {
        this.close()
      }
    })
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
