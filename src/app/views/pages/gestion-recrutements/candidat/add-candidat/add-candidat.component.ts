import {Component, Input, OnInit, Output, TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/services/candidat/candidat.service';
import { Alertes } from 'src/app/util/alerte';
import { EventEmitter } from '@angular/core';
import { competenceService } from 'src/app/services/competence/competence.service';

@Component({
  selector: 'app-add-candidat',
  templateUrl: './add-candidat.component.html',
  styleUrls: ['./add-candidat.component.scss']
})
export class AddCandidatComponent implements OnInit {
  niveauEtudeList = [
  { label: 'Aucun niveau scolaire', value: 'AUCUN' },
  { label: 'Primaire', value: 'PRIMAIRE' },
  { label: 'Certificat d\'Études Primaires (CEP)', value: 'CEP' },
  { label: 'Brevet d\'Études du Premier Cycle (BEPC)', value: 'BEPC' },
  { label: 'Secondaire', value: 'SECONDAIRE' },
  { label: 'Baccalauréat', value: 'BAC' },
  { label: 'BAC +1', value: 'BAC_PLUS_1' },
  { label: 'BAC +2 (BTS, DUT...)', value: 'BAC_PLUS_2' },
  { label: 'Licence (BAC +3)', value: 'LICENCE' },
  { label: 'Licence Professionnelle', value: 'LICENCE_PRO' },
  { label: 'Maîtrise (BAC +4)', value: 'MAITRISE' },
  { label: 'Master 1 (BAC +4)', value: 'MASTER_1' },
  { label: 'Master 2 (BAC +5)', value: 'MASTER_2' },
  { label: 'Master Professionnel', value: 'MASTER_PRO' },
  { label: 'Doctorat (BAC +8)', value: 'DOCTORAT' },
  { label: 'Post-doctorat', value: 'POST_DOCTORAT' },
  { label: 'Formation Professionnelle', value: 'FORMATION_PROFESSIONNELLE' },
  { label: 'Autre (à préciser)', value: 'AUTRE' }
];
form!: FormGroup;
@Output() submit: EventEmitter<boolean> = new EventEmitter();
@Output() search: EventEmitter<boolean> = new EventEmitter();
@Input() evaluationToUpdate: any;
@Input() isSearch: any;
  statuts = [
    {name:'EN_ATTENTE',description:'En Attente'},
    {name:'ACCEPTEE',description:'Acceptée'},
    {name:'REJETEE',description:'Rejetée'},
  ];
  competences: any[] =[];
  pageOptions: any = { page: 0, size: 10 };


  constructor(
    private modalService: NgbModal,
    private candidatService: CandidatService,
    private fb: FormBuilder,
    private competenceService: competenceService
  ) {}

  ngOnInit(): void {
    this.allCompetences;
    this.initForm();
    this.handleValidationAutreNiveau();
  }

  initForm() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: new FormControl('', [Validators.required, Validators.min(0)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      dateNaissance: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      niveauEtude: new FormControl('', Validators.required),
      autreNiveauEtude: [''],
      statutCandidature: new FormControl('EN_ATTENTE', Validators.required),
      recrutementId: new FormControl(localStorage.getItem('recrutementId'), Validators.required),
      idCompetences: new FormControl (null)
    });
    }
    handleValidationAutreNiveau() {
  this.form.get('niveauEtude')?.valueChanges.subscribe(value => {
    const autreCtrl = this.form.get('autreNiveauEtude');
    if (value === 'AUTRE') {
      autreCtrl?.setValidators([Validators.required]);
    } else {
      autreCtrl?.clearValidators();
      autreCtrl?.setValue(''); // reset si pas AUTRE
    }
    autreCtrl?.updateValueAndValidity();
  });

  }




  create(): void {
    const candidat = this.form.value;
    this.candidatService.createCandidat(candidat).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Candidat ajoutée avec succès');
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

  openModal(content: TemplateRef<any>) {
      this.competenceService.open(content)
  }

  allCompetences() {
    this.competenceService.getAllCompetence(this.pageOptions).subscribe({
      next: response => {
        console.log('response',response);
        this.competences = response.payload.map((competence: any) => ({
          ...competence,
          fullName: `${competence.nom} (${competence.niveau})`
        }));
      },
      error: err => {
        console.log(err);
      },
    });
  }
}
