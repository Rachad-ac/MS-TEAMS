import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Alertes} from "../../../../../util/alerte";
import {FormateurService} from "../../../../../services/formateur/formateur.service";

@Component({
  selector: 'app-list-formateur',
  templateUrl: './list-formateur.component.html',
  styleUrls: ['./list-formateur.component.scss']
})
export class ListFormateurComponent implements OnInit {

  displayedColumns: string[] = [
    'nom',
    'prenom',
    'email',
    'type',
    'specialites',
    'actions'
  ];

  formateurToUpdate:any
  pageOptions: any = { paze: 0, size: 10 };
  formateurs: any;
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private formateurServices : FormateurService
  ) { }

  ngOnInit(): void {
    this.getAllFormateurs();
  }
  getAllFormateurs() {
    this.formateurServices.getAllFormateurs(this.pageOptions).subscribe(
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
    this.getAllFormateurs();
  }

  openAddFormateur(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openEditFormateur(content: TemplateRef<any>, formateur: any) {
    this.formateurToUpdate = formateur

    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteFormateur(formateur: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.formateurServices.deleteFormateur(formateur).subscribe({
          next: (value) => {
            Alertes.alerteAddSuccess('Suppression reussie');
          },
          error: (value) => {
            Alertes.alerteAddDanger(value.error.message);
          },
          complete: () => {
            this.getAllFormateurs();
          },
        });
      })
  }
  close(){
    this.modalService.dismissAll();
    this.getAllFormateurs();
  }
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllFormateurs();
    this.modalService.dismissAll();
  }

  saveIdFormateur(formateurId: any) {
    if (formateurId != null) {
      localStorage.setItem('formateurId', formateurId);
    }
  }
}
