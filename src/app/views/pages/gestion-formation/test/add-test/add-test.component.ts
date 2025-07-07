import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/services/formation/formation.service';
import { TestService } from 'src/app/services/test/test.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent {
form!: FormGroup;
@Output() submit: EventEmitter<boolean> = new EventEmitter();
@Output() search: EventEmitter<boolean> = new EventEmitter();
@Input() testToUpdate: any;
@Input() isSearch: any;
formations: any[] = [];
pageOptions: any = { page: 0, size: 10 };


  constructor(
    private modalService: NgbModal,
    private testService: TestService,
    private fb: FormBuilder,
     private formationService: FormationService
    
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      type: ['', Validators.required],
      date: ['', [Validators.required]],
      bareme: ['', [Validators.required]],
      formationId: [localStorage.getItem("formationId")],
    });

     this.formationService.getAllFormations(this.pageOptions).subscribe({
      next: response => {
        console.log('response',response);
        this.formations = response.payload;
        this.loadFileds();
      },
      error: err => {
        console.log(err);
      },
    });
  }

 loadFileds() {
    if (this.testToUpdate !== undefined) {
      this.form?.get('id')?.setValue(this.testToUpdate?.id);
      this.form?.get('type')?.setValue(this.testToUpdate?.type);
      this.form?.get('date')?.setValue(this.testToUpdate?.date);
      this.form?.get('bareme')?.setValue(this.testToUpdate?.bareme);
      this.form?.get('formationId')?.setValue(this.testToUpdate?.formationId);
    }
  }
 

  create(): void {
    const test = this.form.value;
    this.testService.createTest(test).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Test ajouté avec succès');
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
