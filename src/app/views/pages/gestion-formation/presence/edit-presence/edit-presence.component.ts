import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ResultatService} from "../../../../../services/resultat/resultat.service";
import {EmployeService} from "../../../../../services/employe/employe.service";
import {EvaluationService} from "../../../../../services/evaluation/evaluation.service";
import {Alertes} from "../../../../../util/alerte";
import {SessionFormationService} from "../../../../../services/sessionFormation/session-formation.service";
import {PresenceService} from "../../../../../services/presence/presence.service";

@Component({
  selector: 'app-edit-presence',
  templateUrl: './edit-presence.component.html',
  styleUrls: ['./edit-presence.component.scss']
})
export class EditPresenceComponent {

  statutPresence = [
    { label: 'Present', value: 'PRESENT' },
    { label: 'Absent', value: 'ABSENT' }
  ];
  employe : any[] = [];
  sessionFormation: any[] = [];

  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() presenceToUpdate: any;
  @Input() isSearch: any;

  constructor(
    private modalService: NgbModal,
    private presenceService: PresenceService,
    private employeService: EmployeService,
    private sessionFormationService: SessionFormationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.sessionFormationService.getAllSessionFormations().subscribe({
      next: (res) => {
        console.log('session formation récupérés :', res);

        this.sessionFormation = res.payload.map((sessionFormations: any) => ({
          id: sessionFormations.id,
        }));
      },
      error: (err) => {
        console.error('Erreur chargement session formation :', err);
      }
    });

    this.employeService.getAllEmployes().subscribe({
      next: (res) => {
        console.log('employes récupérés :', res);

        this.employe = res.payload.map((employe: any) => ({
          id: employe.id,
          nom: employe.nom,
          prenom: employe.prenom
        }));
      },
      error: (err) => {
        console.error('Erreur chargement recruteurs :', err);
      }
    });
    this.loadFileds()
  }

  initForm() {
    this.form = new FormGroup({
      statutPresence: new FormControl('', Validators.required),
      justification: new FormControl('', Validators.maxLength(500)),
      employeId: new FormControl('', Validators.required),
      sessionFormationId: new FormControl('', Validators.required),
    });
  }

  loadFileds() {
    if (this.presenceToUpdate !== undefined) {
      this.form?.get('statutPresence')?.setValue(this.presenceToUpdate?.statutPresence);
      this.form?.get('justification')?.setValue(this.presenceToUpdate.justification);
      this.form?.get('employeId')?.setValue(this.presenceToUpdate.employeId);
      this.form?.get('sessionFormationId')?.setValue(this.presenceToUpdate.sessionFormation);

    }
  }

  update() {
    let presence = this.form.value;
    this.presenceService.updatePresence(this.presenceToUpdate?.id, presence).subscribe({
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
