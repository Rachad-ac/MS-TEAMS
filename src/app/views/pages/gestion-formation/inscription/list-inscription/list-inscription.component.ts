import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alertes } from 'src/app/util/alerte';
import { InscriptionService } from 'src/app/services/inscription/inscription.service';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { FormationService } from 'src/app/services/formation/formation.service';

@Component({
  selector: 'app-list-inscription',
  templateUrl: './list-inscription.component.html',
  styleUrls: ['./list-inscription.component.scss'],
})
export class ListInscriptionComponent implements OnInit {
  displayedColumns: string[] = [
    'employeId',
    'formationId',
    'dateInscription',
    'statut',
    'actions',
  ];
  inscriptionToUpdate: any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  loadingIndicator = true;
  employes: any[] = [];
  formations: any[] = [];

  constructor(
    private modalService: NgbModal,
    private inscriptionService: InscriptionService,
    private employeService: EmployeService,
    private formationService: FormationService
  ) {}

  ngOnInit(): void {
    this.employeService.getAllEmploye().subscribe(res => this.employes = res);
    this.formationService.getAllFormations().subscribe(res => this.formations = res);
    this.getAllInscriptions();
  }

  getAllInscriptions() {
    this.inscriptionService.getAllInscriptions(this.pageOptions).subscribe({
      next: (response) => {
        this.dataSource = response;
        this.loadingIndicator = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      },
    });
  }

  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllInscriptions();
  }

  openAddInscription(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditInscription(content: TemplateRef<any>, inscription: any) {
    this.inscriptionToUpdate = inscription;
    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService
      .open(content, { size: size, backdrop: 'static' })
      .result.then((result) => {})
      .catch((res) => {});
  }

  deleteInscription(inscription: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimer ?',
      'Cette inscription sera définitivement supprimée',
      () => {
        this.inscriptionService.deleteInscription(inscription.id).subscribe({
          next: (value) => {
            Alertes.alerteAddSuccess('Suppression réussie');
          },
          error: (value) => {
            Alertes.alerteAddDanger(value.error.message);
          },
          complete: () => {
            this.getAllInscriptions();
          },
        });
      }
    );
  }

  close() {
    this.modalService.dismissAll();
    this.getAllInscriptions();
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.getAllInscriptions();
    this.modalService.dismissAll();
  }

  getEmployeName(id: number): string {
    const emp = this.employes.find(e => e.id === id);
    return emp ? emp.nom + ' ' + emp.prenom : String(id);
  }

  getFormationTitle(id: number): string {
    const f = this.formations.find(f => f.id === id);
    return f ? f.titre : String(id);
  }
}
