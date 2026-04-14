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
import {RecrutementService} from "../../../../../services/recrutement/recrutement.service";

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
  recutementId:any;
  recutements:any[] = [];
  pageOptions: any = { page: 0, size: 10 };
  constructor(
    private modalService: NgbModal,
    private candidatService: CandidatService,
    private recutementService: RecrutementService,
    private fb: FormBuilder,
    private competenceService: competenceService,
    private niveauEtudeService: NiveauEtudeService,
    private domaineService : DomaineService
  ) {}

  ngOnInit(): void {
    this.recutementService.getAllRecrutements().subscribe({
      next: (res) => {
        console.log('recutement récupérés :', res);

        this.recutements = res.payload.map((recutement: any) => ({
          ...recutement,
          titre: recutement.titre,
          id: recutement.id,
        }));
      },
      error: (err) => {
        console.error('Erreur chargement recrutemments :', err);
      }
    });

    this.initForm();
    this.loadNiveauxEtude();
    this.allDomaine();

  }

  initForm() {
    this.form = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      dateNaissance: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      niveauEtudeId: new FormControl(null, Validators.required),
      domaine: new FormControl('', Validators.required),
      idCompetence: new FormControl([[]]),
      competence: new FormControl([]),
      recrutementId: new FormControl('', Validators.required),
      statutCandidature: new FormControl('EN_ATTENTE', Validators.required),

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
    const candidat = this.form.value
    this.candidatService.createCandidat(candidat).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Candidat ajoutée avec succès');
        this.emitSubmit();
        console.log(candidat)
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
