import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/services/candidat/candidat.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { competenceService } from 'src/app/services/competence/competence.service';
import { NiveauEtudeService } from 'src/app/services/niveauEtude/niveau-etude.service';


@Component({
  selector: 'app-edit-candidat',
  templateUrl: './edit-candidat.component.html',
  styleUrls: ['./edit-candidat.component.scss']
})
export class EditCandidatComponent implements OnInit {

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
  niveauEtudeList: any[] = [];

  constructor(
    private candidatService: CandidatService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private competenceService: competenceService,
    private niveauEtudeService:NiveauEtudeService,
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
      statutCandidature: new FormControl('EN_ATTENTE', Validators.required),
      recrutementId: new FormControl(localStorage.getItem('recrutementId'), Validators.required),
      idCompetence: new FormControl ([])
    });

    this.loadNiveauxEtude()
    this.allCompetences()
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
