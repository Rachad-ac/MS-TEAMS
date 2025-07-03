import {Component, Input, TemplateRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/services/candidat/candidat.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-candidat',
  templateUrl: './list-candidat.component.html',
  styleUrls: ['./list-candidat.component.scss']
})
export class ListCandidatComponent {
 // Colonnes affichées dans le tableau
  displayedColumns: string[] = [
    'nom',
    'prenom',
    'email',
    'telephone',
    'dateNaissance',
    'adresse',
    'niveauEtude',
    'actions',
  ];


    evaluationToUpdate: any;
    candidatToUpdate: any;
    pageOptions: any = { page: 0, size: 10 };
    dataSource: any;
    loadingIndicator = true;
    @Input() recrutementId: any;
    @Input() statutCandidature: any;

    constructor(
      private modalService: NgbModal,
      private candidatServices: CandidatService
    ) { }

    ngOnInit(): void {
      this.getAllCandidats();
    }

    getAllCandidats(): void {
      this.pageOptions.recrutementId = this.recrutementId;
      this.pageOptions.statutCandidature = this.statutCandidature;
      this.pageOptions.page = 0;
      this.pageOptions.size = 10;
      this.candidatServices.getAllCandidats(this.pageOptions).subscribe({
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
      this.getAllCandidats();
    }

    openAddCandidat(content: TemplateRef<any>): void {
      this.openModal(content, 'lg');
    }

    openEditCandidat(content: TemplateRef<any>, rCandidat: any): void {
      this.candidatToUpdate = rCandidat;
      this.openModal(content, 'lg');
    }

    openModal(content: TemplateRef<any>, size: 'sm' | 'lg' | 'xl'): void {
      this.modalService.open(content, { size, backdrop: 'static' }).result.then(
        () => {},
        () => {}
      );
    }

    deleteCandidat(rCandidat: any): void {
      Alertes.confirmAction(
        'Voulez-vous supprimer ?',
        'Cet élément sera définitivement supprimé',
        () => {
          this.candidatServices.deleteCandidat(rCandidat).subscribe({
            next: () => {
              Alertes.alerteAddSuccess('Suppression réussie');
            },
            error: (err) => {
              Alertes.alerteAddDanger(err?.error?.message || 'Erreur de suppression');
            },
            complete: () => {
              this.getAllCandidats();
            }
          });
        }
      );
    }

    close(): void {
      this.modalService.dismissAll();
      this.getAllCandidats();
    }

    doSearch(data: any): void {
      this.pageOptions = {
        ...data,
        page: 0,
        size: 20
      };
      console.log("Filtres appliqués : ", this.pageOptions);
      this.getAllCandidats();
      this.modalService.dismissAll();
    }
  }

