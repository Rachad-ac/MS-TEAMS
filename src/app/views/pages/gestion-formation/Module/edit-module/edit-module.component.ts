import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/services/formation/formation.service';
import { ModuleService } from 'src/app/services/module/module.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {
  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() sessionFormationToUpdate!: any;
  @Input() isSearch: any;
  @Input() moduleToUpdate: any;
  formations: any[] = [];
  pageOptions: any = { page: 0, size: 10 };

  constructor(
    private moduleService: ModuleService,
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
      titre: new FormControl('', Validators.required),
      ordre: new FormControl('', [Validators.required, Validators.min(1)]),
      formationId: new FormControl(localStorage.getItem("formationId")),       
      
    });
  }

  loadFileds() {
    if (this.moduleToUpdate !== undefined && this.moduleToUpdate !== null) {
      this.form.get('titre')?.setValue(this.moduleToUpdate.titre);
      this.form.get('ordre')?.setValue(this.moduleToUpdate.ordre);
      this.form.get('formationId')?.setValue(this.moduleToUpdate.formationId);
    }
  }

  update() {
    const module = this.form.value;

    this.moduleService.updateModule(this.moduleToUpdate?.id, module).subscribe({
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
