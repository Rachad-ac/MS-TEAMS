import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/services/formation/formation.service';
import { TestService } from 'src/app/services/test/test.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss']
})
export class EditTestComponent {
form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() isSearch: any;
  @Input() testToUpdate: any;
  formations: any[] = [];
  pageOptions: any = { page: 0, size: 10 };

  constructor(
    private testService: TestService,
    private modalService: NgbModal,
    private formationService: FormationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.formationService.getAllFormations(this.pageOptions).subscribe({
      next: response => {
        this.formations = response.payload;
        this.loadFileds();
      },
      error: err => {
        console.log(err);
      },
    });
  }

  initForm() {
    this.form = new FormGroup({
      type: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      bareme: new FormControl('', Validators.required),
      formationId: new FormControl(null),
      formation: new FormControl(null)
    });
  }

  loadFileds() {
    if (this.testToUpdate !== undefined && this.testToUpdate !== null) {
      this.form.get('type')?.setValue(this.testToUpdate.type);
      this.form.get('date')?.setValue(this.testToUpdate.date);
      this.form.get('bareme')?.setValue(this.testToUpdate.bareme);
      this.form.get('formationId')?.setValue(this.testToUpdate.formationId);
    }
  }

  update() {
    const module = this.form.value;

    this.testService.updateTest(this.testToUpdate?.id, module).subscribe({
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
