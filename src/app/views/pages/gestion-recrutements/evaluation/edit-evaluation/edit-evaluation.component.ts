import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import {CandidatureService} from "../../../../../services/candidature/candidature.service";

@Component({
  selector: 'app-edit-evaluation',
  templateUrl: './edit-evaluation.component.html',
  styleUrls: ['./edit-evaluation.component.scss']
})
export class EditEvaluationComponent implements OnInit {

  employes: any[] = [];
  candidatures: any[] = [];

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
      private candidatureService: CandidatureService,
      private fb: FormBuilder
    ) {}

    ngOnInit(): void {
      this.initForm();
      this.evaluationService.getAllEvaluations().subscribe({
        next: (res) => {
          console.log('Recruteur récupérés :', res);

          this.employes = res.payload.map((employe: any) => ({
            id: employe.id,
            nom: employe.nom,
            prenom: employe.prenom
          }));
        },
        error: (err) => {
          console.error('Erreur chargement recruteurs :', err);
        }
      });

      this.candidatureService.getAllCandidatures().subscribe({
        next: (res) => {
          console.log('Candidatures récupérés :', res);

          this.candidatures = res.payload.map((candidature: any) => ({
            id: candidature.candidat.id,
            nom: candidature.candidat.nom,
            prenom: candidature.candidat.prenom
          }));
        },
        error: (err) => {
          console.error('Erreur chargement candidatures :', err);
        }
      });

      this.loadFileds()
    }

  initForm() {
    this.form = new FormGroup({
      type: new FormControl('', Validators.required),
      score: new FormControl('', [Validators.required, Validators.min(0)]),
      noteGenerale: new FormControl('', Validators.required),
      commentaire: new FormControl('', Validators.maxLength(500)),
      dateEvaluation : new FormControl('', Validators.required),
      statut: new FormControl('', Validators.required),
      employeId: new FormControl('', Validators.required),
      candidatureId: new FormControl('', Validators.required),
    });
  }

  loadFileds() {
    if (this.evaluationToUpdate !== undefined) {
      this.form?.get('type')?.setValue(this.evaluationToUpdate?.type?.description);
      this.form?.get('score')?.setValue(this.evaluationToUpdate?.score);
      this.form?.get('noteGenerale')?.setValue(this.evaluationToUpdate.noteGenerale);
      this.form?.get('commentaire')?.setValue(this.evaluationToUpdate.commentaire);
      this.form?.get('dateEvaluation')?.setValue(Helper.editDate(this.evaluationToUpdate?.dateEvaluation));
      this.form?.get('statut')?.setValue(this.evaluationToUpdate?.statut?.description);
      this.form?.get('employeId')?.setValue(this.evaluationToUpdate?.employeId);
      this.form?.get('candidatureId')?.setValue(this.evaluationToUpdate?.candidatureId);
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
