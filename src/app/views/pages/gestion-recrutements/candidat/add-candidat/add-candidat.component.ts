import {Component, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/services/candidat/candidat.service';
import { Alertes } from 'src/app/util/alerte';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-candidat',
  templateUrl: './add-candidat.component.html',
  styleUrls: ['./add-candidat.component.scss']
})
export class AddCandidatComponent implements OnInit {
form!: FormGroup;
@Output() submit: EventEmitter<boolean> = new EventEmitter();
@Output() search: EventEmitter<boolean> = new EventEmitter();
@Input() evaluationToUpdate: any;
@Input() isSearch: any;
  statuts = [
    {name:'EN_ATTENTE',description:'En Attente'},
    {name:'ACCEPTEE',description:'Acceptée'},
    {name:'REJETEE',description:'Rejetée'},
  ]

  constructor(
    private modalService: NgbModal,
    private candidatService: CandidatService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: new FormControl('', [Validators.required, Validators.min(0)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      dateNaissance: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      niveauEtude: new FormControl('', Validators.required),
      statutCandidature: new FormControl('EN_ATTENTE', Validators.required),
      recrutementId: new FormControl(localStorage.getItem('recrutementId'), Validators.required)
    });
  }

  create(): void {
    const candidat = this.form.value;
    this.candidatService.createCandidat(candidat).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Candidat ajoutée avec succès');
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
