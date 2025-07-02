import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleService } from 'src/app/services/module/module.service';
import { Alertes } from 'src/app/util/alerte';


@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent {
form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();

  @Input() isSearch: any;
  @Input() moduleToUpdate: any;

  constructor(private moduleService : ModuleService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder
  ) { }
  ngOnInit(): void {

    this.form = new FormGroup(
      {
        titre: new FormControl("", Validators.required),
         ordre: new FormControl('', [Validators.required, Validators.min(1)]),

      }
    )
    this.loadFileds()
  }
  loadFileds() {
    if (this.moduleToUpdate !== undefined) {
      this.form?.get('titre')?.setValue(this.moduleToUpdate?.titre);
      this.form?.get('ordre')?.setValue(this.moduleToUpdate?.ordre);
    }
  }


  update() {
    let module = this.form.value;

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
