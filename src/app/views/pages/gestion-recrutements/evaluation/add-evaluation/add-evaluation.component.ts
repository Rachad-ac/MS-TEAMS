import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { Alertes } from 'src/app/util/alerte';
import {EmployeService} from "../../../../../services/employe/employe.service";
import {CandidatService} from "../../../../../services/candidat/candidat.service";
import {CandidatureService} from "../../../../../services/candidature/candidature.service";


@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.scss']
})
export class AddEvaluationComponent implements OnInit {

  recruteurs: any[] = [];
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
    private employeService: EmployeService,
    private candidatureService: CandidatureService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.employeService.getAllEmploye().subscribe({
      next: (res) => {
        console.log('Recruteur récupérés :', res);

        this.recruteurs = res.payload.map((recruteur: any) => ({
          ...recruteur,
          fullName: `${recruteur.nom} ${recruteur.prenom}`,
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
          ...candidature,
          fullName: `${candidature.candidat.nom} ${candidature.candidat.prenom}`,
        }));
      },
      error: (err) => {
        console.error('Erreur chargement candidatures :', err);
      }
    });
  }


  initForm() {
    this.form = new FormGroup({
      type: new FormControl('', Validators.required),
      score: new FormControl('', [Validators.required, Validators.min(0)]),
      noteGenerale: new FormControl('', Validators.required),
      commentaire: new FormControl('', Validators.maxLength(500)),
      dateEvaluation : new FormControl('', Validators.required),
      statut: new FormControl('', Validators.required),
      recruteurId: new FormControl('', Validators.required),
      candidatureId: new FormControl('', Validators.required),
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

