import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NiveauEtude, NiveauEtudeService } from 'src/app/services/niveauEtude/niveau-etude.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-add-niveau-etude',
  templateUrl: './add-niveau-etude.component.html',
  styleUrls: ['./add-niveau-etude.component.scss']
})
export class AddNiveauEtudeComponent {
 @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() niveauEtudeToUpdate!: any;
  @Input() isSearch!: boolean;
  pageOptions: any = { paze: 0, size: 10 };
  form!: FormGroup;
 
   constructor(
     private modalService: NgbModal,
     private niveauEtudeService: NiveauEtudeService,
     private fb: FormBuilder, 
   ) {}
   
   ngOnInit(): void {
    this.initForm();
  }

     initForm() {
       this.form = new FormGroup({
         nom: new FormControl('', Validators.required),
         commentaire: new FormControl('', Validators.maxLength(500)),
        
       });
     }
   
     create(): void {
       const niveauEtude = this.form.value;
       this.niveauEtudeService.createNiveauEtude(niveauEtude).subscribe({
         next: () => {
           Alertes.alerteAddSuccess('Niveau Etude ajoutée avec succès');
           this.emitSubmit();
           console.log(niveauEtude);
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
