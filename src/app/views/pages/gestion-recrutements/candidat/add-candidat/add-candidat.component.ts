import {Component, Input, OnInit, Output, TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/services/candidat/candidat.service';
import { Alertes } from 'src/app/util/alerte';
import { EventEmitter } from '@angular/core';
import { competenceService } from 'src/app/services/competence/competence.service';
import { NiveauEtudeService } from 'src/app/services/niveauEtude/niveau-etude.service';

@Component({
  selector: 'app-add-candidat',
  templateUrl: './add-candidat.component.html',
  styleUrls: ['./add-candidat.component.scss']
})
export class AddCandidatComponent implements OnInit {
niveauEtudeList: any;
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
    private competenceService: competenceService,
    private niveauEtudeService: NiveauEtudeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadNiveauxEtude();
    this.allCompetences();
  }

  initForm() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: new FormControl('', [Validators.required, Validators.min(0)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      dateNaissance: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      niveauEtude: new FormControl(null, Validators.required),
      statutCandidature: new FormControl('EN_ATTENTE', Validators.required),
      recrutementId: new FormControl(localStorage.getItem('recrutementId'), Validators.required),
      idCompetence: new FormControl (null)
    });
    }
    loadNiveauxEtude(): void {
    this.niveauEtudeService.getAllNiveauEtudes(this.pageOptions).subscribe({
      next: response => {
        this.niveauEtudeList = response.payload;
      },
      error: err => {
        console.error('Erreur chargement niveaux d\'étude', err);
      },
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
