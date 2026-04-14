import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InscriptionService } from 'src/app/services/inscription/inscription.service';
import { Alertes } from 'src/app/util/alerte';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { FormationService } from 'src/app/services/formation/formation.service';

@Component({
  selector: 'app-add-edit-inscription',
  templateUrl: './add-edit-inscription.component.html',
  styleUrls: ['./add-edit-inscription.component.scss']
})
export class AddEditInscriptionComponent implements OnInit {
  @Input() inscription: any;
  @Output() submit = new EventEmitter<void>();
  inscriptionForm: FormGroup;
  loading = false;
  employes: any[] = [];
  formations: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private inscriptionService: InscriptionService,
    private employeService: EmployeService,
    private formationService: FormationService
  ) {
    this.inscriptionForm = this.fb.group({
      employeId: ['', Validators.required],
      formationId: ['', Validators.required],
      dateInscription: ['', Validators.required],
      statut: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeService.getAllEmploye().subscribe(res => this.employes = res);
    this.formationService.getAllFormations().subscribe(res => this.formations = res);
    if (this.inscription) {
      this.inscriptionForm.patchValue(this.inscription);
    }
  }

  save() {
    if (this.inscriptionForm.invalid) return;
    this.loading = true;
    const data = this.inscriptionForm.value;
    if (this.inscription && this.inscription.id) {
      this.inscriptionService.updateInscription(this.inscription.id, data).subscribe({
        next: () => {
          Alertes.alerteAddSuccess('Inscription modifiée avec succès');
          this.submit.emit();
          this.activeModal.close('saved');
        },
        error: (err) => {
          Alertes.alerteAddDanger('Erreur lors de la modification');
          this.loading = false;
        }
      });
    } else {
      this.inscriptionService.createInscription(data).subscribe({
        next: () => {
          Alertes.alerteAddSuccess('Inscription ajoutée avec succès');
          this.submit.emit();
          this.activeModal.close('saved');
        },
        error: (err) => {
          Alertes.alerteAddDanger('Erreur lors de l\'ajout');
          this.loading = false;
        }
      });
    }
  }
}
