import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {Alertes} from "../../../../../util/alerte";
import {competenceService} from "../../../../../services/competence/competence.service";

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
  competence: any[] = [];
  pageOptions: any = { page: 0, size: 10 };
  form!: FormGroup;
  niveau =[
    {name:'DEBUTANT',description:'Debutant'},
    {name:'INTERMEDIARE',description:'Intermediare'},
    {name:'EXPERT',description:'Expert'},
  ]

  constructor(
              private modalService: NgbModal,
              private fb: FormBuilder,
              private competenceService : competenceService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nom: [''],
      niveau: [''],
      domaine: ['']
    });
        this.loadFileds();
  }

  loadFileds() {
    if (this.competenceToUpdate !== undefined) {
      this.form?.get('id')?.setValue(this.competenceToUpdate.id);
      this.form?.get('nom')?.setValue(this.competenceToUpdate.nom);
      this.form?.get('niveau')?.setValue(this.competenceToUpdate.niveau);
      this.form?.get('domaine')?.setValue(this.competenceToUpdate.domaine);
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
    this.modalService.dismissAll();
  }

  doSearch(){
    this.search.emit(this.form.value)
  }

  emitSubmit(){
    this.submit.emit(true);
  }
}
