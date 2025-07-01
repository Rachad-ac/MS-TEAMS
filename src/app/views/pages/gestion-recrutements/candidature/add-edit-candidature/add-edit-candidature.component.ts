import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidatureService } from '../../../../../services/candidature/candidature.service';
import { RecrutementService } from '../../../../../services/recrutement/recrutement.service';
import { Alertes } from '../../../../../util/alerte';
import { CandidatService } from '../../../../../services/candidat/candidat.service';

@Component({
  selector: 'app-add-edit-candidature',
  templateUrl: './add-edit-candidature.component.html',
  styleUrls: ['./add-edit-candidature.component.scss'],
})
export class AddEditCandidatureComponent implements OnInit {
  /**
   * Si renseigné, le formulaire est en mode modification
   */
  @Input() candidatureToUpdate: any = null;
  /**
   * Si true, le formulaire sert à la recherche (pas à l'ajout/modif)
   */
  @Input() isSearch: boolean = false;
  /**
   * Événement émis après ajout ou modification
   */
  @Output() submit = new EventEmitter<void>();
  /**
   * Événement émis lors d'une recherche
   */
  @Output() search = new EventEmitter<any>();

  candidatureForm: FormGroup; // Formulaire réactif
  loading = false; // Indicateur de chargement
  recrutements: any[] = [];
  candidats: any[] = []; // Prévu pour plus tard

  constructor(
    private fb: FormBuilder,
    private candidatureService: CandidatureService,
    private recrutementService: RecrutementService,
    private candidatService: CandidatService
  ) {
    // Initialisation du formulaire avec validation
    this.candidatureForm = this.fb.group({
      dateCandidature: [null, Validators.required],
      statut: ['', Validators.required],
      recrutementId: [null, Validators.required],
      candidatId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // Charger la liste des recrutements pour le select
    this.recrutementService.getAllRecrutements().subscribe((data) => {
      this.recrutements = data.payload || data;
    });
    // Charger la liste des candidats pour le select
    this.candidatService.getAllCandidats().subscribe((data) => {
      this.candidats = data.payload || data;
    });
    if (this.candidatureToUpdate) {
      this.candidatureForm.patchValue({
        ...this.candidatureToUpdate,
        recrutementId: this.candidatureToUpdate.recrutementId,
      });
    }
  }

  /**
   * Soumission du formulaire (ajout ou modification)
   */
  onSubmit() {
    if (this.candidatureForm.invalid) return;
    this.loading = true;
    const candidature = this.candidatureForm.value;
    if (this.candidatureToUpdate) {
      // Modification
      this.candidatureService
        .updateCandidature(this.candidatureToUpdate.idCandidature, candidature)
        .subscribe({
          next: () => {
            Alertes.alerteAddSuccess('Modification réussie');
            this.submit.emit();
          },
          error: (err) => {
            Alertes.alerteAddDanger(
              err.error?.message || 'Erreur lors de la modification'
            );
            this.loading = false;
          },
          complete: () => (this.loading = false),
        });
    } else {
      // Ajout
      this.candidatureService.createCandidature(candidature).subscribe({
        next: () => {
          Alertes.alerteAddSuccess('Ajout réussi');
          this.submit.emit();
        },
        error: (err) => {
          Alertes.alerteAddDanger(
            err.error?.message || "Erreur lors de l'ajout"
          );
          this.loading = false;
        },
        complete: () => (this.loading = false),
      });
    }
  }

  /**
   * Soumission du formulaire en mode recherche
   */
  onSearch() {
    if (this.candidatureForm.invalid) return;
    this.search.emit(this.candidatureForm.value);
  }
}
