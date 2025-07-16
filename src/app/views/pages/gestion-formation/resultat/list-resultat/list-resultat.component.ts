import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Alertes} from "../../../../../util/alerte";
import {ResultatService} from "../../../../../services/resultat/resultat.service";

@Component({
  selector: 'app-list-resultat',
  templateUrl: './list-resultat.component.html',
  styleUrls: ['./list-resultat.component.scss']
})
export class ListResultatComponent implements OnInit {

  displayedColumns : string[] = [
    'note',
    'commentaire',
    'employe_id',
    'evaluation_id',
    'detailles',
    'actions'
  ];

  resultatToUpdate: any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private resultatService: ResultatService
  ) { }

  ngOnInit(): void {
    this.getAllResultat();
  }

  getAllResultat(): void {
    this.resultatService.getAllResultat(this.pageOptions).subscribe({
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
    this.getAllResultat();
  }

  openAddResultat(content: TemplateRef<any>): void {
    this.openModal(content, 'lg');
  }

  openEditResultat(content: TemplateRef<any>, resultat: any): void {
    this.resultatToUpdate = resultat;
    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: 'sm' | 'lg' | 'xl'): void {
    this.modalService.open(content, { size, backdrop: 'static' }).result.then(
      () => {},
      () => {}
    );
  }

  deleteResultat(resultat: any): void {
    Alertes.confirmAction(
      'Voulez-vous supprimer ?',
      'Cet élément sera définitivement supprimé',
      () => {
        this.resultatService.deleteResultat(resultat.id).subscribe({
          next: () => {
            Alertes.alerteAddSuccess('Suppression réussie');
          },
          error: (err) => {
            Alertes.alerteAddDanger(err?.error?.message || 'Erreur de suppression');
          },
          complete: () => {
            this.getAllResultat();
          }
        });
      }
    );
  }

  close(): void {
    this.modalService.dismissAll();
    this.getAllResultat();
  }

  doSearch(data: any): void {
    this.pageOptions = {
      ...data,
      page: 0,
      size: 20
    };
    console.log("Filtres appliqués : ", this.pageOptions);
    this.getAllResultat();
    this.modalService.dismissAll();
  }

}
