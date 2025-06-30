import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alertes } from '../../../../../util/alerte';
import { CandidatureService } from '../../../../../services/candidature/candidature.service';

@Component({
  selector: 'app-list-candidature',
  templateUrl: './list-candidature.component.html',
  styleUrls: ['./list-candidature.component.scss'],
})
export class ListCandidatureComponent implements OnInit {
  // Colonnes affichées dans le tableau
  displayedColumns: string[] = [
    'dateCandidature',
    'statut',
    'titreRecrutement',
    'nomCandidat',
    'detailles',
    'actions',
  ];

  candidatureToUpdate: any; // Stocke la candidature à modifier
  pageOptions: any = { page: 0, size: 10 }; // Options de pagination
  candidatures: any; // Liste des candidatures (non utilisé directement)
  dataSource: any; // Source de données pour le tableau
  loadingIndicator = true; // Indicateur de chargement

  constructor(
    private modalService: NgbModal,
    private candidatureServices: CandidatureService
  ) {}

  ngOnInit(): void {
    this.getAllCandidatures();
  }

  /**
   * Récupère la liste paginée/filtrée des candidatures
   */
  getAllCandidatures() {
    this.candidatureServices.getAllCandidatures(this.pageOptions).subscribe({
      next: (response) => {
        console.log('response', response);
        this.dataSource = response;
        this.loadingIndicator = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      },
    });
  }

  /**
   * Gère la pagination du tableau
   * @param $event Numéro de page sélectionné
   */
  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllCandidatures();
  }

  /**
   * Ouvre la modale d'ajout de candidature
   */
  openAddCandidature(content: TemplateRef<any>) {
    this.openModal(content, 'lg');
  }

  /**
   * Ouvre la modale de modification de candidature
   */
  openEditCandidature(content: TemplateRef<any>, candidature: any) {
    this.candidatureToUpdate = candidature;
    this.openModal(content, 'lg');
  }

  /**
   * Ouvre une modale générique
   */
  openModal(content: TemplateRef<any>, size: any) {
    this.modalService
      .open(content, { size: size, backdrop: 'static' })
      .result.then((result) => {})
      .catch((res) => {});
  }

  /**
   * Supprime une candidature après confirmation
   */
  deleteCandidature(candidature: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimer ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.candidatureServices.deleteCandidature(candidature).subscribe({
          next: (value) => {
            Alertes.alerteAddSuccess('Suppression reussie');
          },
          error: (value) => {
            Alertes.alerteAddDanger(value.error.message);
          },
          complete: () => {
            this.getAllCandidatures();
          },
        });
      }
    );
  }

  /**
   * Ferme toutes les modales et recharge la liste
   */
  close() {
    this.modalService.dismissAll();
    this.getAllCandidatures();
  }

  /**
   * Lance une recherche avec les filtres saisis
   */
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log('filtres ', this.pageOptions);
    this.getAllCandidatures();
    this.modalService.dismissAll();
  }
}
