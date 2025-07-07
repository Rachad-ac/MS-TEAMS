import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Alertes} from "../../../../../util/alerte";
import {EmployeService} from "../../../../../services/employe/employe.service";

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent implements OnInit{

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

  create(): void {
    const employe = this.form.value;
    this.employeService.createEmploye(employe).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Employe ajoutée avec succès');
        this.emitSubmit();
      },
      error: (err) => {
        Alertes.alerteAddDanger(err.error.message || 'Erreur lors de l’ajout');
      },
      complete: () => {
        this.close();
      }
    });
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
