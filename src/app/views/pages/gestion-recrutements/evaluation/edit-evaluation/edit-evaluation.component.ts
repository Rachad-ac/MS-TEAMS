import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import {EmployeService} from "../../../../../services/employe/employe.service";
import {CandidatService} from "../../../../../services/candidat/candidat.service";

@Component({
  selector: 'app-edit-evaluation',
  templateUrl: './edit-evaluation.component.html',
  styleUrls: ['./edit-evaluation.component.scss']
})
export class EditEvaluationComponent implements OnInit {

  employes: any[] = [];
  candidat: any[] = [];

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
      private candidatService: CandidatService,
      private employeService: EmployeService,
      private fb: FormBuilder
    ) {}

    ngOnInit(): void {
      this.initForm();
      this.employeService.getAllEmploye().subscribe({
        next: (res) => {
          console.log('employes récupérés :', res);

          this.employes = res.payload.map((employe: any) => ({
            ...employe,
            fullName: `${employe.nom} ${employe.prenom}`,
            id: employe.id,
          }));
        },
        error: (err) => {
          console.error('Erreur chargement employes :', err);
        }
      });

      this.candidatService.getAllCandidats().subscribe({
        next: (res) => {
          console.log('Candidats récupérés :', res);

          this.candidat = res.payload.map((candidat: any) => ({
            ...candidat,
            fullName: `${candidat.nom} ${candidat.prenom}`,
            id: candidat.id,
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
      type: new FormControl(''),
      score: new FormControl(''),
      noteGenerale: new FormControl(''),
      commentaire: new FormControl(''),
      dateEvaluation : new FormControl(''),
      statut: new FormControl(''),
      employeId: new FormControl(''),
      candidatId: new FormControl(''),
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
      this.form?.get('candidatId')?.setValue(this.evaluationToUpdate?.candidatureId);
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
