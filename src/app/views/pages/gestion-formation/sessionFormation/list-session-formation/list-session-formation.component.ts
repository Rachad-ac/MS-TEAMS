import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alertes } from 'src/app/util/alerte';
import {SessionFormationService} from "../../../../../services/sessionFormation/session-formation.service";

@Component({
  selector: 'app-list-session-formation',
  templateUrl: './list-session-formation.component.html',
  styleUrls: ['./list-session-formation.component.scss']
})
export class ListSessionFormationComponent implements OnInit {
  displayedColumns: string[] = [
    'lieu',
    'dateDebut',
    'dateFin',
    'nombrePlaces',
    'actions'
  ];
  sessionFormationToUpdate:any
  pageOptions: any = { paze: 0, size: 10 };
  sessionFormations: any;
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private sessionFormationServices : SessionFormationService
  ) { }

  ngOnInit(): void {
    this.getAllSessionFormations();
  }
  getAllSessionFormations() {
    this.sessionFormationServices.getAllSessionFormations(this.pageOptions).subscribe(
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
    this.getAllSessionFormations();
  }

  openAddSessionFormation(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditSessionFormation(content: TemplateRef<any>, sessionFormation: any) {
    this.sessionFormationToUpdate = sessionFormation

    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteSessionFormation(sessionFormation: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.sessionFormationServices.deleteSessionFormation(sessionFormation).subscribe({
          next: (value) => {
            Alertes.alerteAddSuccess('Suppression reussie');
          },
          error: (value) => {
            Alertes.alerteAddDanger(value.error.message);
          },
          complete: () => {
            this.getAllSessionFormations();
          },
        });
      })
  }
  close(){
    this.modalService.dismissAll();
    this.getAllSessionFormations();
  }
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllSessionFormations();
    this.modalService.dismissAll();
  }
}
