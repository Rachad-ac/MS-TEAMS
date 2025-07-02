import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alertes } from 'src/app/util/alerte';
import { EmployeService } from 'src/app/services/employe/employe.service';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss'],
})
export class ListEmployeComponent implements OnInit {
  displayedColumns: string[] = [
    'nom',
    'prenom',
    'email',
    'departement',
    'poste',
    'dateEmbauche',
    'actions',
  ];
  employeToUpdate: any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private employeService: EmployeService
  ) {}

  ngOnInit(): void {
    this.getAllEmployes();
  }

  getAllEmployes() {
    this.employeService.getAllEmployes(this.pageOptions).subscribe({
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
    this.getAllEmployes();
  }

  openAddEmploye(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditEmploye(content: TemplateRef<any>, employe: any) {
    this.employeToUpdate = employe;
    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService
      .open(content, { size: size, backdrop: 'static' })
      .result.then((result) => {})
      .catch((res) => {});
  }

  deleteEmploye(employe: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimer ?',
      'Cet employé sera définitivement supprimé',
      () => {
        this.employeService.deleteEmploye(employe.id).subscribe({
          next: (value) => {
            Alertes.alerteAddSuccess('Suppression réussie');
          },
          error: (value) => {
            Alertes.alerteAddDanger(value.error.message);
          },
          complete: () => {
            this.getAllEmployes();
          },
        });
      }
    );
  }

  close() {
    this.modalService.dismissAll();
    this.getAllEmployes();
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.getAllEmployes();
    this.modalService.dismissAll();
  }
}
