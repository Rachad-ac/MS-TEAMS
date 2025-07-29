import {Component, Input, OnInit, Output, TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/services/candidat/candidat.service';
import { Alertes } from 'src/app/util/alerte';
import { EventEmitter } from '@angular/core';
import { competenceService } from 'src/app/services/competence/competence.service';
import { NiveauEtudeService } from 'src/app/services/niveauEtude/niveau-etude.service';
import { DomaineService } from 'src/app/services/domaine/domaine.service';
import { Helper } from 'src/app/util/helper';

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
@Input() candidatToUpdate: any;
@Input() isSearch: any;
  statuts = [
    {name:'EN_ATTENTE',description:'En Attente'},
    {name:'ACCEPTEE',description:'Acceptée'},
    {name:'REJETEE',description:'Rejetée'},
  ];
  competences: any[] =[];
  domaines: any[] =[];
  recutementId:any
  pageOptions: any = { page: 0, size: 10 };
  constructor(
    private modalService: NgbModal,
    private candidatService: CandidatService,
    private fb: FormBuilder,
    private competenceService: competenceService,
    private niveauEtudeService: NiveauEtudeService,
    private domaineService : DomaineService
  ) {}

  ngOnInit(): void {
    this.recutementId =localStorage.getItem("recrutementId"),
    console.log("RecrutementId",this.recutementId);
    
    this.initForm();
    this.loadFileds();
    this.loadNiveauxEtude();
    this.allDomaine();
   
  }

  initForm() {
    this.form = this.fb.group({
      nom: [''],
      prenom: new FormControl(''),
      email: new FormControl(''),
      telephone: new FormControl(''),
      dateNaissance: new FormControl(''),
      adresse: new FormControl(''),
      niveauEtudeId: new FormControl(null),
      domaine: [''],
      idCompetence: [[]],
      competence: [null],
      statutCandidature: new FormControl('EN_ATTENTE'),
     
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
        this.form?.get('domaine')?.setValue(this.candidatToUpdate?.competence[0].domaine.id);
        this.form?.get('recrutementId')?.setValue(this.candidatToUpdate?.recrutementId);
        this.form?.get('idCompetence')?.setValue(this.candidatToUpdate?.idCompetence);
        this.form?.get('statutCandidature')?.setValue(this.candidatToUpdate?.statutCandidature?.name);
      }
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
    const candidat = this.form.value
    candidat.recrutementId = this.recutementId
    console.log("form",candidat)
    this.candidatService.createCandidat(candidat).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Candidat ajoutée avec succès');
        this.emitSubmit();
        console.log(data)
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
  
  
  allDomaine() {
    this.domaineService.getAllDomaines(this.pageOptions).subscribe({
      next: response => {
        this.domaines = response.payload;
      }
    })
  }

  allCompetences(domaine: any) {
    this.pageOptions.domaineId = domaine?.id;
    this.pageOptions.paze = 0;
    this.pageOptions.size = 100;
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
