import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Alertes} from "../../../../../util/alerte";
import {RecrutementService} from "../../../../../services/recrutement/recrutement.service";

@Component({
  selector: 'app-list-recrutement',
  templateUrl: './list-recrutement.component.html',
  styleUrls: ['./list-recrutement.component.scss']
})
export class ListRecrutementComponent implements OnInit {
  displayedColumns: string[] = [
    'titre',
    'dateLimite',
    'lieu',
    'typeContrat',
    'publier',
    'detailles',
    'actions'
  ];
  displayedColumnsCompetence: string[] = ['nom', 'niveau', 'domaine'];

  candidat: any = null;
  recrutementId: any;
  recrutementToUpdate:any
  pageOptions: any = { paze: 0, size: 10 };
  recrutements: any;
  recrutement: any;
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private recrutementServices : RecrutementService
  ) { }

  ngOnInit(): void {
    this.getAllRecrutements();
    this.getRecrutementById();
  }
  getAllRecrutements() {
    this.recrutementServices.getAllRecrutements(this.pageOptions).subscribe(
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

  getRecrutementById() {
    this.recrutementId = localStorage.getItem('recrutementId');
    this.recrutementServices.getRecrutementId(this.recrutementId).subscribe({
      next:(data) =>{
        console.log(data);
        this.recrutements = data.payload;
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    });
  }

  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllRecrutements();
  }

  openAddRecrutement(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  openInfoRecrutement(content: TemplateRef<any>, recrutement: any) {
    this.recrutement = recrutement;
    this.openModal(content, 'lg');
  }

  openEditRecrutement(content: TemplateRef<any>, recrutement: any) {
    this.recrutementToUpdate = recrutement

    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteRecrutement(recrutement: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.recrutementServices.deleteRecrutement(recrutement).subscribe({
          next: (value) => {
            Alertes.alerteAddSuccess('Suppression reussie');
          },
          error: (value) => {
            Alertes.alerteAddDanger(value.error.message);
          },
          complete: () => {
            this.getAllRecrutements();
          },
        });
      })
  }
  close(){
    this.modalService.dismissAll();
    this.getAllRecrutements();
    this.getRecrutementById();
  }
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("filtres ", this.pageOptions)
    this.getAllRecrutements();
    this.modalService.dismissAll();
  }

  saveIdRecrutement(recrutementId: any) {
    if (recrutementId != null) {
      localStorage.setItem('recrutementId', recrutementId);
    }
  }
}
