import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SessionFormationService} from "../../../../../services/sessionFormation/session-formation.service";
import {Alertes} from "../../../../../util/alerte";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-session-formation',
  templateUrl: './add-session-formation.component.html',
  styleUrls: ['./add-session-formation.component.scss']
})
export class AddSessionFormationComponent implements OnInit {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() sessionFormationToUpdate!: any;
  @Input() isSearch!: boolean;
  pageOptions: any = { paze: 0, size: 10 };
  form!: FormGroup;

  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private sessionFormationServices : SessionFormationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nom: ['', Validators.required],
      description: ['', Validators.required],
      idAgents: [[], Validators.required],
      agent: [null]
    });


  }

  loadFileds() {
    if (this.sessionFormationToUpdate !== undefined) {
      this.form?.get('id')?.setValue(this.sessionFormationToUpdate?.id);
      this.form?.get('nom')?.setValue(this.sessionFormationToUpdate?.nom);
      this.form?.get('description')?.setValue(this.sessionFormationToUpdate?.description);
      this.form?.get('idAgents')?.setValue(this.sessionFormationToUpdate?.idAgents);
    }
  }

  create() {
    let sessionFormation = this.form.value;
    const action: Observable<any> = (this.sessionFormationToUpdate !== undefined) ? this.sessionFormationServices.updateSessionFormation(this.sessionFormationToUpdate.id, sessionFormation) : this.sessionFormationServices.createSessionFormation(sessionFormation);
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
