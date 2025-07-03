import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {Alertes} from "../../../../../util/alerte";
import {RecrutementService} from "../../../../../services/recrutement/recrutement.service";
import {competenceService} from "../../../../../services/competence/competence.service";

@Component({
  selector: 'app-add-recrutement',
  templateUrl: './add-recrutement.component.html',
  styleUrls: ['./add-recrutement.component.scss']
})
export class AddRecrutementComponent implements OnInit {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() recrutementToUpdate!: any;
  @Input() isSearch!: boolean;
  competences: any[] = [];
  pageOptions: any = { paze: 0, size: 10 };
  form!: FormGroup;
  typeContrats =[
    {name:'CDD',description:'Contrat à Durée Déterminée'},
    {name:'CDI',description:'Contrat à Durée Indéterminée'},
    {name:'STAGE',description:'Stage'},
  ];

  constructor(
              private modalService: NgbModal,
              private fb: FormBuilder,
              private recrutementServices : RecrutementService,
              private competenceService: competenceService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      titre: ['', Validators.required],
      description: [''],
      dateLimite: [null],
      lieu: [''],
      typeContrat: [null, Validators.required],
      salaire: [null],
      domaine: [''],
      publier: [false],
      idCompetences: [[]],
      competence: [null]
    });

    this.allCompetences();
  }

  loadFileds() {
    if (this.recrutementToUpdate !== undefined) {
      this.form?.get('id')?.setValue(this.recrutementToUpdate.id);
      this.form?.get('titre')?.setValue(this.recrutementToUpdate.titre);
      this.form?.get('description')?.setValue(this.recrutementToUpdate.description);
      this.form?.get('dateLimite')?.setValue(this.recrutementToUpdate.dateLimite);
      this.form?.get('lieu')?.setValue(this.recrutementToUpdate.lieu);
      this.form?.get('typeContrat')?.setValue(this.recrutementToUpdate.typeContrat.name);
      this.form?.get('salaire')?.setValue(this.recrutementToUpdate.salaire);
      this.form?.get('domaine')?.setValue(this.recrutementToUpdate.domaine);
      this.form?.get('publier')?.setValue(this.recrutementToUpdate.publier);
      this.form?.get('idCompetences')?.setValue(this.recrutementToUpdate.idCompetences);
    }
  }


  create() {
    let recrutement = this.form.value;
    const action: Observable<any> = (this.recrutementToUpdate !== undefined) ? this.recrutementServices.updateRecrutement(this.recrutementToUpdate.id, recrutement) : this.recrutementServices.createRecrutement(recrutement);
    action.subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      },
      complete:()=>{
        this.close()
      }
    });
  }

  close(){
    this.modalService.dismissAll();
  }

  doSearch(){
    this.search.emit(this.form.value)
  }

  emitSubmit(){
    this.submit.emit(true);
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
        this.loadFileds();
      },
      error: err => {
        console.log(err);
      },
    });
  }
}
