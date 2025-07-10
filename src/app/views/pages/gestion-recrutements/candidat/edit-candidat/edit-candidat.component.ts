import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/services/candidat/candidat.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { competenceService } from 'src/app/services/competence/competence.service';


@Component({
  selector: 'app-edit-candidat',
  templateUrl: './edit-candidat.component.html',
  styleUrls: ['./edit-candidat.component.scss']
})
export class EditCandidatComponent implements OnInit {
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
 form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();

  @Input() isSearch: any;
  @Input() candidatToUpdate: any;
  statuts = [
    {name:'EN_ATTENTE',description:'En Attente'},
    {name:'ACCEPTEE',description:'Acceptée'},
    {name:'REJETEE',description:'Rejetée'},
  ];
  competences: any[] =[];
  pageOptions: any = { page: 0, size: 10 };

  constructor(
    private candidatService: CandidatService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private competenceService: competenceService
  ) {}
  ngOnInit(): void {
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
      idCompetence: new FormControl ([])
    });

    this.handleValidationAutreNiveau();
    this.allCompetences()
  }

  handleValidationAutreNiveau() {
    this.form.get('niveauEtude')?.valueChanges.subscribe(value => {
      const autreCtrl = this.form.get('autreNiveauEtude');
      if (value === 'AUTRE') {
        autreCtrl?.setValidators([Validators.required]);
      } else {
        autreCtrl?.clearValidators();
        autreCtrl?.setValue('');
      }
      autreCtrl?.updateValueAndValidity();
    });
  }

  loadFileds() {
    if (this.candidatToUpdate !== undefined) {
      this.form?.get('nom')?.setValue(this.candidatToUpdate?.nom);
      this.form?.get('prenom')?.setValue(this.candidatToUpdate?.prenom);
      this.form?.get('email')?.setValue(this.candidatToUpdate?.email);
      this.form?.get('adresse')?.setValue(this.candidatToUpdate?.adresse);
      this.form?.get('telephone')?.setValue(this.candidatToUpdate?.telephone);
      this.form?.get('dateNaissance')?.setValue(Helper.editDate(this.candidatToUpdate?.dateNaissance));
      this.form?.get('niveauEtude')?.setValue(this.candidatToUpdate?.niveauEtude);
      this.form?.get('autreNiveauEtude')?.setValue(this.candidatToUpdate?.autreNiveauEtude || '');
      this.form?.get('statutCandidature')?.setValue(this.candidatToUpdate?.statutCandidature?.name);
      this.form?.get('recrutementId')?.setValue(this.candidatToUpdate?.recrutementId);
      this.form?.get('idCompetence')?.setValue(this.candidatToUpdate?.idCompetence);
    }
  }

  update() {
    let candidat = this.form.value;

    this.candidatService.updateCandidat(this.candidatToUpdate?.id, candidat).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Enregistrement réussi');
        this.emitSubmit();
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message);
      },
      complete: () => {
        this.close();
      }
    });
  }

  close() {
    this.modalService.dismissAll();
  }

  openModal(content: TemplateRef<any>) {
    this.competenceService.open(content)
  }

  emitSubmit() {
    this.submit.emit(true);
  }

  allCompetences() {
    this.competenceService.getAllCompetence(this.pageOptions).subscribe({
      next: response => {
        console.log('response',response);
        this.competences = response.payload.map((competence: any) => ({
          ...competence,
          fullName: `${competence.nom} (${competence.niveau})`
        }));
        this.loadFileds()
      },
      error: err => {
        console.log(err);
      },
    });
  }
}
