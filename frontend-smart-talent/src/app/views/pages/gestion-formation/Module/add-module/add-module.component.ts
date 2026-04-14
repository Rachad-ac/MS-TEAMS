import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/services/formation/formation.service';
import { ModuleService } from 'src/app/services/module/module.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent {
form!: FormGroup;
@Output() submit: EventEmitter<any> = new EventEmitter();
@Output() search: EventEmitter<any> = new EventEmitter();
@Input() moduleToUpdate: any;
@Input() isSearch: any;
formations: any[] = [];
 pageOptions: any = { page: 0, size: 10 };


  constructor(
    private modalService: NgbModal,
    private moduleService: ModuleService,
    private fb: FormBuilder,
     private formationService: FormationService
    
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      titre: ['', Validators.required],
      ordre: new FormControl('', [Validators.required, Validators.min(1)]),
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
    if (this.moduleToUpdate !== undefined) {
      this.form?.get('id')?.setValue(this.moduleToUpdate?.id);
      this.form?.get('titre')?.setValue(this.moduleToUpdate?.titre);
      this.form?.get('ordre')?.setValue(this.moduleToUpdate?.ordre);
      this.form?.get('FormationId')?.setValue(this.moduleToUpdate?.FormationId);
    }
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
