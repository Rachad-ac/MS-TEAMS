import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {Alertes} from "../../../../../util/alerte";
import {FormateurService} from "../../../../../services/formateur/formateur.service";

@Component({
  selector: 'app-add-formateur',
  templateUrl: './add-formateur.component.html',
  styleUrls: ['./add-formateur.component.scss']
})
export class AddFormateurComponent  implements OnInit  {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() formateurToUpdate!: any;
  @Input() isSearch!: boolean;
  competences: any[] = [];
  pageOptions: any = { paze: 0, size: 10 };
  form!: FormGroup;

  constructor(
              private modalService: NgbModal,
              private fb: FormBuilder,
              private formateurServices : FormateurService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      nom: [''],
      prenom: [''],
      email: [''],
      type: [''],
      specialites: ['']  
    });
        this.loadFileds();
  }

  loadFileds() {
    if (this.formateurToUpdate !== undefined) {
      this.form?.get('id')?.setValue(this.formateurToUpdate.id);
      this.form?.get('nom')?.setValue(this.formateurToUpdate.nom);
      this.form?.get('prenom')?.setValue(this.formateurToUpdate.prenom);
      this.form?.get('email')?.setValue(this.formateurToUpdate.email);
      this.form?.get('type')?.setValue(this.formateurToUpdate.type);
      this.form?.get('specialites')?.setValue(this.formateurToUpdate.specialites);
    }
  }


  create() {
    let formateur = this.form.value;
    const action: Observable<any> = (this.formateurToUpdate !== undefined) ? this.formateurServices.updateFormateur(this.formateurToUpdate.id, formateur) : this.formateurServices.createFormateur(formateur);
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

