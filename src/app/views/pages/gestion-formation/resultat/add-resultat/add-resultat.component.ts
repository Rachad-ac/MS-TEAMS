import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Alertes} from "../../../../../util/alerte";
import {ResultatService} from "../../../../../services/resultat/resultat.service";
import {EvaluationService} from "../../../../../services/evaluation/evaluation.service";
import {EmployeService} from "../../../../../services/employe/employe.service";

@Component({
  selector: 'app-add-resultat',
  templateUrl: './add-resultat.component.html',
  styleUrls: ['./add-resultat.component.scss']
})
export class AddResultatComponent {

  employe : any[] = [];
  evaluations: any[] = [];

  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() evaluationToUpdate: any;
  @Input() isSearch: any;

  constructor(
    private modalService: NgbModal,
    private evaluationService: EvaluationService,
    private employeService: EmployeService,
    private resultatService: ResultatService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.evaluationService.getAllEvaluations().subscribe({
      next: (res) => {
        console.log('evaluations récupérés :', res);

        this.evaluations = res.payload.map((evaluation: any) => ({
          id: evaluation.id,
          type: evaluation.type,
        }));
      },
      error: (err) => {
        console.error('Erreur chargement recruteurs :', err);
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
        console.error('Erreur chargement employe :', err);
      }
    });
  }

  initForm() {
    this.form = new FormGroup({
      note: new FormControl('', [Validators.required, Validators.min(0)]),
      commentaire: new FormControl('', Validators.maxLength(500)),
      employeId: new FormControl('', Validators.required),
      evaluationId: new FormControl('', Validators.required),
    });
  }

  create(): void {
    const resultat = this.form.value;
    this.resultatService.createResultat(resultat).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Resultat ajoutée avec succès');
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
