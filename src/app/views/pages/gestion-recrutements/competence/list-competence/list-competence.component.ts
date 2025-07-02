import {Component, OnInit,ViewChild, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Alertes} from "../../../../../util/alerte";
import {competenceService} from "../../../../../services/competence/competence.service";

@Component({
  selector: 'app-list-competence',
  templateUrl: './list-competence.component.html',
  styleUrls: ['./list-competence.component.scss']
})
export class ListCompetenceComponent {
  @ViewChild('SearchCompetenceModal') SearchCompetenceModal: any;
  @ViewChild('addCompetenceModal') addCompetenceModal: any;
  @ViewChild('EditCompetenceModal') EditCompetenceModal: any;
  @ViewChild('DeleteCompetenceModal') DeleteCompetenceModal: any;

displayedColumns: string[] = [
    'nom',
    'niveau',
    'domaine',
    'actions'
  ];

  competenceToUpdate:any
  pageOptions: any = { paze: 0, size: 10 };
  competence: any;
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private competenceService : competenceService
  ) { }

  ngOnInit(): void {
    this.getAllcompetence();
  }
  getAllcompetence() {
    this.competenceService.getAllCompetence(this.pageOptions).subscribe(
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
    this.getAllcompetence();
  }

  openAddCompetence(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditCompetence(content: TemplateRef<any>, competence?: any) {
    this.competenceToUpdate = competence
    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size?: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteCompetence(competence: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.competenceService.deleteCompetence(competence).subscribe({
          next: (value) => {
            Alertes.alerteAddSuccess('Suppression reussie');
          },
          error: (value) => {
            Alertes.alerteAddDanger(value.error.message);
          },
          complete: () => {
            this.getAllcompetence();
          },
        });
      })
  }
  close(){
    this.modalService.dismissAll();
    this.getAllcompetence();
  }
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.paze = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllcompetence();
    this.modalService.dismissAll();
  }
}
