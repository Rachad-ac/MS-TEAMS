import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Alertes} from "../../../../../util/alerte";
import {ResultatService} from "../../../../../services/resultat/resultat.service";
import {EmployeService} from "../../../../../services/employe/employe.service";
import {EvaluationService} from "../../../../../services/evaluation/evaluation.service";

@Component({
  selector: 'app-edit-resultat',
  templateUrl: './edit-resultat.component.html',
  styleUrls: ['./edit-resultat.component.scss']
})
export class EditResultatComponent implements OnInit{

  employe : any[] = [];
  evaluations: any[] = [];

  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() resultatToUpdate: any;
  @Input() isSearch: any;

  constructor(
    private modalService: NgbModal,
    private resultatService: ResultatService,
    private employeService: EmployeService,
    private evaluationService: EvaluationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.evaluationService.getAllEvaluations().subscribe({
      next: (res) => {
        console.log('evaluations récupérés :', res);

        this.evaluations = res.payload.map((evaluation: any) => ({
          ...evaluation,
          typeEvalutation: `${evaluation.type.description}`,

          id: evaluation.id,
          type: evaluation.type,
        }));
      },
      error: (err) => {
        console.error('Erreur chargement recruteurs :', err);
      }
    });

    this.employeService.getAllEmploye().subscribe({
      next: (res) => {
        console.log('employes récupérés :', res);

        this.employe = res.payload.map((employe: any) => ({
          ...employe,
          fullName: `${employe.nom} ${employe.prenom}`,

          id: employe.id,
          nom: employe.nom,
          prenom: employe.prenom
        }));
      },
      error: (err) => {
        console.error('Erreur chargement Employe :', err);
      }
    });
    this.loadFileds()
  }

  initForm() {
    this.form = new FormGroup({
      note: new FormControl('', [Validators.required, Validators.min(0)]),
      commentaire: new FormControl('', Validators.maxLength(500)),
      employeId: new FormControl('', Validators.required),
      evaluationId: new FormControl('', Validators.required),
    });
  }

  loadFileds() {
    if (this.resultatToUpdate !== undefined) {
      this.form?.get('note')?.setValue(this.resultatToUpdate?.note);
      this.form?.get('commentaire')?.setValue(this.resultatToUpdate?.commentaire);
      this.form?.get('employeId')?.setValue(this.resultatToUpdate?.employeId);
      this.form?.get('evaluationId')?.setValue(this.resultatToUpdate?.evaluationId);

    }
  }

  update() {
    let resultat = this.form.value;
    this.resultatService.updateResultat(this.resultatToUpdate?.id, resultat).subscribe({
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
