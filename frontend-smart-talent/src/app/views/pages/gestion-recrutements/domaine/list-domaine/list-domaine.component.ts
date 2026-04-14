import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Alertes} from "../../../../../util/alerte";
import {DomaineService} from "../../../../../services/domaine/domaine.service";

@Component({
  selector: 'app-list-domaine',
  templateUrl: './list-domaine.component.html',
  styleUrls: ['./list-domaine.component.scss']
})
export class ListDomaineComponent implements OnInit {

  displayedColumns: string[] = [
    'nom',
    'description',
    //'detailles',
    'actions'
  ];

  domaineToUpdate:any
  pageOptions: any = { page: 0, size: 10 };
  domaines: any;
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private domaineServices : DomaineService
  ) { }

  ngOnInit(): void {
    this.getAllDomaines();
  }
  getAllDomaines() {
    this.domaineServices.getAllDomaines(this.pageOptions).subscribe(
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
    this.getAllDomaines();
  }

  openAddDomaine(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditDomaine(content: TemplateRef<any>, domaine: any) {
    this.domaineToUpdate = domaine

    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteDomaine(domaine: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.domaineServices.deleteDomaine(domaine).subscribe({
          next: (value) => {
            Alertes.alerteAddSuccess('Suppression reussie');
          },
          error: (value) => {
            Alertes.alerteAddDanger(value.error.message);
          },
          complete: () => {
            this.getAllDomaines();
          },
        });
      })
  }
  close(){
    this.modalService.dismissAll();
    this.getAllDomaines();
  }
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllDomaines();
    this.modalService.dismissAll();
  }

  saveIdDomaine(domaineId: any) {
    if (domaineId != null) {
      localStorage.setItem('domaineId', domaineId);
    }
  }
}
