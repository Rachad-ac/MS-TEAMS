import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NiveauEtudeService } from 'src/app/services/niveauEtude/niveau-etude.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-niveau-etude',
  templateUrl: './list-niveau-etude.component.html',
  styleUrls: ['./list-niveau-etude.component.scss']
})
export class ListNiveauEtudeComponent {
 // Colonnes affichées dans le tableau
  displayedColumns: string[] = [
    'nom',
    'commentaire',
    'actions'
  ];
   
    niveauEtudeToUpdate: any; 
    pageOptions: any = { page: 0, size: 10 };
    dataSource: any;
    loadingIndicator = true;
   

    constructor(
      private modalService: NgbModal,
      private niveauEtudeService: NiveauEtudeService
    ) { }

    ngOnInit(): void {
      this.getAllNiveauEtudes();
    }

    getAllNiveauEtudes(): void {
      this.pageOptions.page = 0;
      this.pageOptions.size = 10;
      this.niveauEtudeService.getAllNiveauEtudes(this.pageOptions).subscribe({
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
      this.getAllNiveauEtudes();
    }

    openAddNiveauEtude(content: TemplateRef<any>): void {
      this.openModal(content, 'lg');
    }

    openEditNiveauEtude(content: TemplateRef<any>, rNiveauEtude: any): void {
      this.niveauEtudeToUpdate = rNiveauEtude;
      this.openModal(content, 'lg');
    }

    openModal(content: TemplateRef<any>, size: 'sm' | 'lg' | 'xl'): void {
      this.modalService.open(content, { size, backdrop: 'static' }).result.then(
        () => {},
        () => {}
      );
    }

    deleteNiveauEtude(rNiveauEtude: any): void {
     Alertes.confirmAction(
    'Voulez-vous supprimer ?',
    'Cet élément sera définitivement supprimé',
    () => {
      this.niveauEtudeService.deleteNiveauEtude(rNiveauEtude.id).subscribe({
        next: () => {
          Alertes.alerteAddSuccess('Suppression réussie');
        },
        error: (err) => {
          Alertes.alerteAddDanger(err?.error?.message || 'Erreur de suppression');
        },
        complete: () => {
          this.getAllNiveauEtudes();
        }
      });
    }
  );
}

    close(): void {
      this.modalService.dismissAll();
      this.getAllNiveauEtudes();
    }

    doSearch(data: any): void {
      this.pageOptions = {
        ...data,
        page: 0,
        size: 20
      };
      console.log("Filtres appliqués : ", this.pageOptions);
      this.getAllNiveauEtudes();
      this.modalService.dismissAll();
    }

    saveIdNiveauEtude(niveauEtudeId: any) {
    if (niveauEtudeId != null) {
      localStorage.setItem('niveauEtudeId', niveauEtudeId);
    }
  }
}
