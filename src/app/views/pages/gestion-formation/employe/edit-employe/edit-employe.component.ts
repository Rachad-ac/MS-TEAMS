import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EmployeService} from "../../../../../services/employe/employe.service";
import {Alertes} from "../../../../../util/alerte";
import {Helper} from "../../../../../util/helper";

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.scss']
})
export class EditEmployeComponent implements OnInit {

  sexe = [
    { label: 'Masculin', value: 'MASCULIN' },
    { label: 'Féminin', value: 'FEMININ' }
  ];

  departement = [
    { label: 'Ressources Humaines', value: 'RH' },
    { label: 'Finance', value: 'FINANCE' },
    { label: 'Informatique', value: 'INFORMATIQUE' },
    { label: 'Marketing', value: 'MARKETING' },
    { label: 'Logistique', value: 'LOGISTIQUE' },
    { label: 'Commercial', value: 'COMMERCIAL' },
    { label: 'Autre', value: 'AUTRE' }
  ];

  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() employeToUpdate: any;
  @Input() isSearch: any;

  constructor(
    private modalService: NgbModal,
    private employeService: EmployeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFileds();
  }

  initForm() {
    this.form = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.maxLength(500)),
      email: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      poste: new FormControl('', Validators.required),
      departement: new FormControl('', Validators.required),
      sexe: new FormControl('', Validators.required),
      dateEmbauche: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  loadFileds() {
    if (this.employeService !== undefined) {
      this.form?.get('nom')?.setValue(this.employeToUpdate?.nom);
      this.form?.get('prenom')?.setValue(this.employeToUpdate?.prenom);
      this.form?.get('email')?.setValue(this.employeToUpdate.email);
      this.form?.get('telephone')?.setValue(this.employeToUpdate.telephone);
      this.form?.get('poste')?.setValue(this.employeToUpdate?.poste);
      this.form?.get('departement')?.setValue(this.employeToUpdate?.departement?.description);
      this.form?.get('sexe')?.setValue(this.employeToUpdate?.sexe?.description);
      this.form?.get('dateEmbauche')?.setValue(this.employeToUpdate?.dateEmbauche);
      this.form?.get('role')?.setValue(this.employeToUpdate?.role);
    }
  }

  update() {
    let employe = this.form.value;
    this.employeService.updateEmploye(this.employeToUpdate?.id, employe).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message)
      },
      complete: () => {
        this.close()
      }
    })
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

}
