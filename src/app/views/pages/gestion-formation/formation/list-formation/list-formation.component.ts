import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormationService} from "../../../../../services/formation/formation.service";
import {Alertes} from "../../../../../util/alerte";

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.scss']
})
export class ListFormationComponent implements OnInit {
  displayedColumns: string[] = [
    'titre',
    'objectif',
    'dateDebut',
    'dateFin',
    'niveau',
    'statut',
    'detailles',
    'actions'
  ];

  formationToUpdate:any
  pageOptions: any = { paze: 0, size: 10 };
  formations: any;
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private formationServices : FormationService
  ) { }

  ngOnInit(): void {
    this.getAllFormations();
  }
  getAllFormations() {
    this.formationServices.getAllFormations(this.pageOptions).subscribe(
      {
        next: response => {
          console.log('response',response);

          this.dataSource = response;
          this.loadingIndicator = false;
        },
        error: err => {
          console.log(err);
          this.loadingIndicator = false;
        },
        complete: () => {
          this.loadingIndicator = false;
        }
      }
    )
  }

  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllFormations();
  }

  openAddFormation(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditFormation(content: TemplateRef<any>, formation: any) {
    this.formationToUpdate = formation

    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteFormation(formation: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.formationServices.deleteFormation(formation).subscribe({
          next: (value) => {
            Alertes.alerteAddSuccess('Suppression reussie');
          },
          error: (value) => {
            Alertes.alerteAddDanger(value.error.message);
          },
          complete: () => {
            this.getAllFormations();
          },
        });
      })
  }
  close(){
    this.modalService.dismissAll();
    this.getAllFormations();
  }
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllFormations();
    this.modalService.dismissAll();
  }

  saveIdFormation(formationId: any) {
    if (formationId != null) {
      localStorage.setItem('formationId', formationId);
    }
  }
}
