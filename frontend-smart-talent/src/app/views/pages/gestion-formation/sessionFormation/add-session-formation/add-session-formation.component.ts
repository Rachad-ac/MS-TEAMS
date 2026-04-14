import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SessionFormationService} from "../../../../../services/sessionFormation/session-formation.service";
import {Alertes} from "../../../../../util/alerte";
import {Observable} from "rxjs";
import {FormationService} from "../../../../../services/formation/formation.service";

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
  formations: any[] = [];

  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private sessionFormationServices : SessionFormationService,
              private formationService: FormationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      lieu: ['', Validators.required],
      date: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      idFormation: [null],
      formation:[null]
    });

    this.formationService.getAllFormations(this.pageOptions).subscribe({
      next: response => {
        console.log('response',response);
        this.formations = response.payload;
        this.loadFileds();
      },
      error: err => {
        console.log(err);
      },
    });
  }

  loadFileds() {
    if (this.sessionFormationToUpdate !== undefined) {
      this.form?.get('id')?.setValue(this.sessionFormationToUpdate?.id);
      this.form?.get('lieu')?.setValue(this.sessionFormationToUpdate?.lieu);
      this.form?.get('date')?.setValue(this.sessionFormationToUpdate?.date);
      this.form?.get('heureDebut')?.setValue(this.sessionFormationToUpdate?.heureDebut);
      this.form?.get('heureDebut')?.setValue(this.sessionFormationToUpdate?.heureDebut);
      this.form?.get('idFormation')?.setValue(this.sessionFormationToUpdate?.idFormation);
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
