import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/services/candidat/candidat.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-edit-candidat',
  templateUrl: './edit-candidat.component.html',
  styleUrls: ['./edit-candidat.component.scss']
})
export class EditCandidatComponent {
 form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();

  @Input() isSearch: any;
  @Input() candidatToUpdate: any;

  constructor(private candidatService: CandidatService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder
  ) { }
  ngOnInit(): void {

    this.form = new FormGroup(
      {
        nom: new FormControl("", Validators.required),
        prenom: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        telephone: new FormControl("", Validators.required),
        dateNaissance: new FormControl("", Validators.required),
        adresse: new FormControl("", Validators.required),
        niveauEtude: new FormControl("", Validators.required),
      }
    )
    this.loadFileds()
  }
  loadFileds() {
    if (this.candidatToUpdate !== undefined) {
      this.form?.get('nom')?.setValue(this.candidatToUpdate?.nom);
      this.form?.get('prenom')?.setValue(this.candidatToUpdate?.prenom);
      this.form?.get('email')?.setValue(this.candidatToUpdate?.email);
      this.form?.get('adresse')?.setValue(this.candidatToUpdate?.adresse);
      this.form?.get('telephone')?.setValue(this.candidatToUpdate?.telephone);
      this.form?.get('dateNaissance')?.setValue(Helper.editDate(this.candidatToUpdate?.dateNaissance));
      this.form?.get('adresse')?.setValue(this.candidatToUpdate?.adresse);
      this.form?.get('niveauEtude')?.setValue(this.candidatToUpdate?.niveauEtude);
    }
  }


  update() {
    let candidat = this.form.value;

    this.candidatService.updateCandidat(this.candidatToUpdate?.id, candidat).subscribe({
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

  close() {
    this.modalService.dismissAll();
  }

  doSearch() {
    this.search.emit(this.form.value)
  }

  emitSubmit() {
    this.submit.emit(true);
  }
}
