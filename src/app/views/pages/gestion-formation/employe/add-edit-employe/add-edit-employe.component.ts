import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-edit-employe',
  templateUrl: './add-edit-employe.component.html',
  styleUrls: ['./add-edit-employe.component.scss'],
})
export class AddEditEmployeComponent implements OnInit {
  @Input() employe: any;
  @Output() submit = new EventEmitter<void>();
  employeForm: FormGroup;
  loading = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private employeService: EmployeService
  ) {
    this.employeForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departement: ['', Validators.required],
      poste: ['', Validators.required],
      dateEmbauche: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.employe) {
      this.employeForm.patchValue(this.employe);
    }
  }

  save() {
    if (this.employeForm.invalid) return;
    this.loading = true;
    const data = this.employeForm.value;
    if (this.employe && this.employe.id) {
      this.employeService.updateEmploye(this.employe.id, data).subscribe({
        next: () => {
          Alertes.alerteAddSuccess('Employé modifié avec succès');
          this.submit.emit();
          this.activeModal.close('saved');
        },
        error: (err) => {
          Alertes.alerteAddDanger('Erreur lors de la modification');
          this.loading = false;
        },
      });
    } else {
      this.employeService.createEmploye(data).subscribe({
        next: () => {
          Alertes.alerteAddSuccess('Employé ajouté avec succès');
          this.submit.emit();
          this.activeModal.close('saved');
        },
        error: (err) => {
          Alertes.alerteAddDanger("Erreur lors de l'ajout");
          this.loading = false;
        },
      });
    }
  }
}
