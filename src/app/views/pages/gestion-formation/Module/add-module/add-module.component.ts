import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleService } from 'src/app/services/module/module.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent {
form!: FormGroup;
@Output() submit: EventEmitter<boolean> = new EventEmitter();
@Output() search: EventEmitter<boolean> = new EventEmitter();
@Input() evaluationToUpdate: any;
@Input() isSearch: any;

  constructor(
    private modalService: NgbModal,
    private moduleService: ModuleService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      titre: ['', Validators.required],
      ordre: new FormControl('', [Validators.required, Validators.min(1)]),

    });
  }


 

  create(): void {
    const module = this.form.value;
    this.moduleService.createModule(module).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Module ajoutée avec succès');
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
