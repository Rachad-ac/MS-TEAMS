import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {Alertes} from "../../../../../util/alerte";
import {competenceService} from "../../../../../services/competence/competence.service";
import {DomaineService} from "../../../../../services/domaine/domaine.service";

@Component({
  selector: 'app-add-competence',
  templateUrl: './add-competence.component.html',
  styleUrls: ['./add-competence.component.scss']
})
export class AddCompetenceComponent implements OnInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() competenceToUpdate!: any;
  @Input() isSearch: boolean =true;

  pageOptions: any = { page: 0, size: 10 };
  form!: FormGroup;
  domaine: any[] = [];

  niveau =[
    {name:'DEBUTANT',description:'Debutant'},
    {name:'INTERMEDIARE',description:'Intermediare'},
    {name:'EXPERT',description:'Expert'},
  ]

  constructor(
              private modalService: NgbModal,
              private fb: FormBuilder,
              private competenceService : competenceService,
              private domaineService : DomaineService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.domaineService.getAllDomaines().subscribe({
      next: (res) => {
        console.log('Domaine récupérés :', res);

        this.domaine = res.payload.map((domaine: any) => ({
          ...domaine,
          name: `${domaine.nom} `,
          id: domaine.id,
        }));
      },
      error: (err) => {
        console.error('Erreur chargement recruteurs :', err);
      }
    });
    this.loadFileds();
  }

  initForm() {
    this.form = this.fb.group({
      nom: new FormControl('', Validators.required),
      niveau: new FormControl('', Validators.required),
      domaineId: new FormControl('', Validators.required),
    });
  }

  loadFileds() {
    if (this.competenceToUpdate !== undefined) {
      this.form?.get('nom')?.setValue(this.competenceToUpdate.nom);
      this.form?.get('niveau')?.setValue(this.competenceToUpdate.niveau);
      this.form?.get('domaineId')?.setValue(this.competenceToUpdate.domaine);
    }
  }


  create() {
    let competence = this.form.value;
    const action: Observable<any> = (this.competenceToUpdate !== undefined) ? this.competenceService.updateCompetence(this.competenceToUpdate.id, competence) : this.competenceService.createCompetence(competence);
    action.subscribe({
      next:(data) =>{
        if (data.status == "BAD_REQUEST") {
          Alertes.alerteAddDanger(data.message);
          return;
        } else {
                  Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
        }
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
    this.competenceService.close();
  }

  doSearch(){
    this.search.emit(this.form.value)
  }

  emitSubmit(){
    this.submit.emit(true);
  }
}
