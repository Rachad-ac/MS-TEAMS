import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Alertes} from "../../../../../util/alerte";
import {EmployeService} from "../../../../../services/employe/employe.service";

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit{

  displayedColumns : string[] = [
    'nom',
    'prenom',
    'email',
    'telephone',
    'poste',
    'departement',
    'sexe',
    'dateEmbauche',
    'role',
    'detailles',
    'actions'
  ];

  employeToUpdate: any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private employeService: EmployeService,
  ) { }

  ngOnInit(): void {
    this.getAllEmploye();
  }

  getAllEmploye(): void {
    this.employeService.getAllEmploye(this.pageOptions).subscribe({
      next: response => {
        console.log('response', response);
        this.dataSource = response;
        this.loadingIndicator = false;
      },
      error: err => {
        console.error(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  paginate($event: number): void {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllEmploye();
  }

  openAddEmploye(content: TemplateRef<any>): void {
    this.openModal(content, 'lg');
  }

  openEditEmploye(content: TemplateRef<any>, Employe: any): void {
    this.employeToUpdate = Employe;
    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: 'sm' | 'lg' | 'xl'): void {
    this.modalService.open(content, { size, backdrop: 'static' }).result.then(
      () => {},
      () => {}
    );
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
            this.getAllEmploye();
          }
        });
      }
    );
  }

  close(): void {
    this.modalService.dismissAll();
    this.getAllEmploye();
  }

  doSearch(data: any): void {
    this.pageOptions = {
      ...data,
      page: 0,
      size: 20
    };
    console.log("Filtres appliqués : ", this.pageOptions);
    this.getAllEmploye();
    this.modalService.dismissAll();
  }

}
