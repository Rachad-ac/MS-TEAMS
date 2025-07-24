import {Component, TemplateRef} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ResultatService} from "../../../../../services/resultat/resultat.service";
import {Alertes} from "../../../../../util/alerte";
import {PresenceService} from "../../../../../services/presence/presence.service";

@Component({
  selector: 'app-list-presence',
  templateUrl: './list-presence.component.html',
  styleUrls: ['./list-presence.component.scss']
})
export class ListPresenceComponent {


  displayedColumns : string[] = [
    'statut',
    'justification',
    'employe_id',
    'sessionFormation_id',
    'detailles',
    'actions'
  ];

  presenceToUpdate: any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  loadingIndicator = true;

  constructor(
    private modalService: NgbModal,
    private presenceService: PresenceService
  ) { }

  ngOnInit(): void {
    this.getAllPresence();
  }

  getAllPresence(): void {
    this.presenceService.getAllPresence(this.pageOptions).subscribe({
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
    this.getAllPresence();
  }

  openAddPresence(content: TemplateRef<any>): void {
    this.openModal(content, 'lg');
  }

  openEditPresence(content: TemplateRef<any>, presence: any): void {
    this.presenceToUpdate = presence;
    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: 'sm' | 'lg' | 'xl'): void {
    this.modalService.open(content, { size, backdrop: 'static' }).result.then(
      () => {},
      () => {}
    );
  }

  deletePresence(presence: any): void {
    Alertes.confirmAction(
      'Voulez-vous supprimer ?',
      'Cet élément sera définitivement supprimé',
      () => {
        this.presenceService.deletePresence(presence.id).subscribe({
          next: () => {
            Alertes.alerteAddSuccess('Suppression réussie');
          },
          error: (err) => {
            Alertes.alerteAddDanger(err?.error?.message || 'Erreur de suppression');
          },
          complete: () => {
            this.getAllPresence();
          }
        });
      }
    );
  }

  close(): void {
    this.modalService.dismissAll();
    this.getAllPresence();
  }

  doSearch(data: any): void {
    this.pageOptions = {
      ...data,
      page: 0,
      size: 20
    };
    console.log("Filtres appliqués : ", this.pageOptions);
    this.getAllPresence();
    this.modalService.dismissAll();
  }

}
