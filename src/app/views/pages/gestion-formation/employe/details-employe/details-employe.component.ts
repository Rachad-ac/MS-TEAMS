import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Alertes} from "../../../../../util/alerte";
import {EmployeService} from "../../../../../services/employe/employe.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-details-employe',
  templateUrl: './details-employe.component.html',
  styleUrls: ['./details-employe.component.scss']
})
export class DetailsEmployeComponent implements OnInit {

  employeToUpdate: any;
  employes: any = null;
  employeId: any;
  loadingIndicator = true;

  constructor(private activateRoute: ActivatedRoute,
              private modalService: NgbModal,
              private employeService: EmployeService
  ) {}

  ngOnInit(): void {
    const employeId = this.activateRoute.snapshot.paramMap.get('id');
    if (employeId != null) {
      localStorage.setItem('employeId', employeId);
    }
    this.employeService.getEmployeId(employeId).subscribe({
      next:(data) =>{
        console.log(data);
        this.employes = data.payload;
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    });
  }

  deleteEmploye(employe: any): void {
    Alertes.confirmAction(
      'Voulez-vous supprimer ?',
      'Cet élément sera définitivement supprimé',
      () => {
        this.employeService.deleteEmploye(employe.id).subscribe({
          next: () => {
            Alertes.alerteAddSuccess('Suppression réussie');
          },
          error: (err) => {
            Alertes.alerteAddDanger(err?.error?.message || 'Erreur de suppression');
          },
          complete: () => {
            this.loadingIndicator = false;
          }
        });
      }
    );
  }

  close(): void {
    this.modalService.dismissAll();
  }

  openModal(content: TemplateRef<any>, size: 'sm' | 'lg' | 'xl'): void {
    this.modalService.open(content, { size, backdrop: 'static' }).result.then(
      () => {},
      () => {}
    );
  }

  openEditEmploye(content: TemplateRef<any>, Employes: any): void {
    this.employeToUpdate = Employes;
    this.openModal(content, 'lg');
  }

}
