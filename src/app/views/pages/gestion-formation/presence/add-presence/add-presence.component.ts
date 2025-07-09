import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EmployeService} from "../../../../../services/employe/employe.service";
import {Alertes} from "../../../../../util/alerte";
import {SessionFormationService} from "../../../../../services/sessionFormation/session-formation.service";
import {PresenceService} from "../../../../../services/presence/presence.service";

@Component({
  selector: 'app-add-presence',
  templateUrl: './add-presence.component.html',
  styleUrls: ['./add-presence.component.scss']
})
export class AddPresenceComponent {

  statutPresence = [
    { label: 'Present', value: 'PRESENT' },
    { label: 'Absent', value: 'ABSENT' }
  ];
  employe : any[] = [];
  sessionFormation: any[] = [];

  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() evaluationToUpdate: any;
  @Input() isSearch: any;

  constructor(
    private modalService: NgbModal,
    private sessionFormationService: SessionFormationService,
    private employeService: EmployeService,
    private presenceService: PresenceService,
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
        console.error('Erreur chargement session foermation :', err);
      }
    });

    this.employeService.getAllEmploye().subscribe({
      next: (res) => {
        console.log('employes récupérés :', res);

        this.employe = res.payload.map((employe: any) => ({
          id: employe.id,
          nom: employe.nom,
          prenom: employe.prenom
        }));
      },
      error: (err) => {
        console.error('Erreur chargement employe :', err);
      }
    });
  }

  initForm() {
    this.form = new FormGroup({
      statutPresence: new FormControl('', Validators.required),
      justification: new FormControl('', Validators.maxLength(500)),
      employeId: new FormControl('', Validators.required),
      sessionFormationId: new FormControl('', Validators.required),
    });
  }

  create(): void {
    const resultat = this.form.value;
    this.presenceService.createPresence(resultat).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Presence ajoutée avec succès');
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
