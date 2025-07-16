import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {Alertes} from "../../../../../util/alerte";
import {DomaineService} from "../../../../../services/domaine/domaine.service";


@Component({
  selector: 'app-add-domaine',
  templateUrl: './add-domaine.component.html',
  styleUrls: ['./add-domaine.component.scss']
})
export class AddDomaineComponent implements OnInit {
 @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() domaineToUpdate!: any;
  @Input() isSearch!: boolean;
  pageOptions: any = { page: 0, size: 10 };
  form!: FormGroup;
  constructor(
              private modalService: NgbModal,
              private fb: FormBuilder,
              private domaineServices : DomaineService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nom: [''],
      description: [''],
    });
    this.loadFileds();
  }

  loadFileds() {
    if (this.domaineToUpdate !== undefined) {
      this.form?.get('id')?.setValue(this.domaineToUpdate.id);
      this.form?.get('nom')?.setValue(this.domaineToUpdate.nom);
      this.form?.get('description')?.setValue(this.domaineToUpdate.description);
    }
  }
  create() {
    let domaine = this.form.value;
    const action: Observable<any> = (this.domaineToUpdate !== undefined) ? this.domaineServices.updateDomaine(this.domaineToUpdate.id, domaine) : this.domaineServices.createDomaine(domaine);
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
