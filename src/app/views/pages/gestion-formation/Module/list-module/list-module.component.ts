import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleService } from 'src/app/services/module/module.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-module',
  templateUrl: './list-module.component.html',
  styleUrls: ['./list-module.component.scss']
})
export class ListModuleComponent {
 displayedColumns: string[] = [
    'titre',
    'ordre',
    'actions',
  ];

  
    moduleToUpdate: any; 
    pageOptions: any = { page: 0, size: 10 };
    dataSource: any;
    loadingIndicator = true;
  
    constructor(
      private modalService: NgbModal,
      private moduleServices: ModuleService
    ) { }
  
    ngOnInit(): void {
      this.getAllModules();
    }

    getAllModules(): void {
      this.moduleServices.getAllModules(this.pageOptions).subscribe({
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
      this.getAllModules();
    }

    openAddModule(content: TemplateRef<any>): void {
      this.openModal(content, 'lg');
    }

    openEditModule(content: TemplateRef<any>, rModule: any): void {
      this.moduleToUpdate = rModule;
      this.openModal(content, 'lg');
    }
  
    openModal(content: TemplateRef<any>, size: 'sm' | 'lg' | 'xl'): void {
      this.modalService.open(content, { size, backdrop: 'static' }).result.then(
        () => {},
        () => {}
      );
    }

    deleteModule(rModule: any): void {
      Alertes.confirmAction(
        'Voulez-vous supprimer ?',
        'Cet élément sera définitivement supprimé',
        () => {
          this.moduleServices.deleteModule(rModule).subscribe({
            next: () => {
              Alertes.alerteAddSuccess('Suppression réussie');
            },
            error: (err) => {
              Alertes.alerteAddDanger(err?.error?.message || 'Erreur de suppression');
            },
            complete: () => {
              this.getAllModules();
            }
          });
        }
      );
    }
  
    close(): void {
      this.modalService.dismissAll();
      this.getAllModules();
    }
  
    doSearch(data: any): void {
      this.pageOptions = {
        ...data,
        page: 0,
        size: 20
      };
      console.log("Filtres appliqués : ", this.pageOptions);
      this.getAllModules();
      this.modalService.dismissAll();
    }

}
