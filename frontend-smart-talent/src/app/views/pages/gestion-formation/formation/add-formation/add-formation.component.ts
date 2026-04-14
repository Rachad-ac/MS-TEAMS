import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormationService} from "../../../../../services/formation/formation.service";
import {Observable} from "rxjs";
import {Alertes} from "../../../../../util/alerte";

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.scss']
})
export class AddFormationComponent implements OnInit {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() formationToUpdate!: any;
  @Input() isSearch!: boolean;
  pageOptions: any = { paze: 0, size: 10 };
  form!: FormGroup;
  niveaux =[
    {name:'DEBUTANT',description:'Debutant'},
    {name:'INTERMEDIARE',description:'Intermediare'},
    {name:'EXPERT',description:'Expert'},
  ];

  statuts =[
    {name:'PLANIFIEE',description:'Planifiée'},
    {name:'EN_COURS',description:'En cours'},
    {name:'TERMINEE',description:'Terminée'},
  ];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private formationServices : FormationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      titre: ['', Validators.required],
      description: [''],
      objectif: ['', Validators.required],
      dateDebut: [null, Validators.required],
      dateFin: [null, Validators.required],
      niveau: [null, Validators.required],
      statut: [null, Validators.required],
    });

    this.loadFileds();
  }

  loadFileds() {
    if (this.formationToUpdate !== undefined) {
      this.form?.get('id')?.setValue(this.formationToUpdate.id);
      this.form?.get('titre')?.setValue(this.formationToUpdate.titre);
      this.form?.get('description')?.setValue(this.formationToUpdate.description);
      this.form?.get('objectif')?.setValue(this.formationToUpdate.objectif);
      this.form?.get('dateDebut')?.setValue(this.formationToUpdate.dateDebut);
      this.form?.get('dateFin')?.setValue(this.formationToUpdate.dateFin);
      this.form?.get('niveau')?.setValue(this.formationToUpdate.niveau.name);
      this.form?.get('statut')?.setValue(this.formationToUpdate.statut.name);
    }
  }


  create() {
    let formation = this.form.value;
    const action: Observable<any> = (this.formationToUpdate !== undefined) ? this.formationServices.updateFormation(this.formationToUpdate.id, formation) : this.formationServices.createFormation(formation);
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

}
