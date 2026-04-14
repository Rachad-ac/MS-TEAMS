import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomaineService } from 'src/app/services/domaine/domaine.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-edit-domaine',
  templateUrl: './edit-domaine.component.html',
  styleUrls: ['./edit-domaine.component.scss']
})
export class EditDomaineComponent implements OnInit {

 form!: FormGroup
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();

  @Input() isSearch: any;
  @Input() domaineToUpdate: any;
  pageOptions: any = { page: 0, size: 10 };

  constructor(
    private domaineService: DomaineService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.loadFileds();
  }

  loadFileds() {
    if (this.domaineToUpdate !== undefined) {
      this.form?.get('nom')?.setValue(this.domaineToUpdate.nom);
      this.form?.get('description')?.setValue(this.domaineToUpdate.description);
    }
  }

  update() {
    let domaine = this.form.value;

    this.domaineService.updateDomaine(this.domaineToUpdate?.id, domaine).subscribe({
      next: (data) => {
        if (data.status == "BAD_REQUEST") {
          Alertes.alerteAddDanger(data.message);
          return;
        } else {
                  Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
        }
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      },
      complete:()=>{
        this.close()
      }
    });
  }

  close() {
    this.modalService.dismissAll();
  }

  emitSubmit() {
    this.submit.emit(true);
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg' });
  }
}
