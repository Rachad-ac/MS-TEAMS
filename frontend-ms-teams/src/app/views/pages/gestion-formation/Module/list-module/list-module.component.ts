import { Component, Input, TemplateRef } from '@angular/core';
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
    'formation',
    'actions',
  ];

  
    moduleToUpdate:any
      pageOptions: any = { page: 0, size: 10, formationId: null };
      modules: any;
      dataSource: any;
      loadingIndicator = true;
      @Input() formationId: any;
    
      constructor(
        private modalService: NgbModal,
        private moduleServices : ModuleService
      ) { }
    
      ngOnInit(): void {
        this.getAllModules();
      }
      getAllModules() {
        this.loadingIndicator = true;
        this.pageOptions.formationId = this.formationId;
        this.pageOptions.page = 0;
        this.pageOptions.size = 10;
    
        this.moduleServices.getAllModules(this.pageOptions).subscribe(
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
        this.getAllModules();
      }
    
      openAddModule(content: TemplateRef<any>) {
        this.openModal(content, 'lg');
      }
    
      openEditModule(content: TemplateRef<any>, module: any) {
        this.moduleToUpdate = module
    
        this.openModal(content, 'lg');
      }
    
      openModal(content: TemplateRef<any>, size: any) {
        this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
        }).catch((res) => {});
      }
    
      deleteModule(module: any) {
        Alertes.confirmAction(
          'Voulez-vous supprimé ?',
          'Cet element sera definitivement supprimé',
          () => {
            this.moduleServices.deleteModule(module).subscribe({
              next: (value) => {
                Alertes.alerteAddSuccess('Suppression reussie');
              },
              error: (value) => {
                Alertes.alerteAddDanger(value.error.message);
              },
              complete: () => {
                this.getAllModules();
              },
            });
          })
      }
      close(){
        this.modalService.dismissAll();
        this.getAllModules();
      }
      doSearch(data: any) {
        this.pageOptions = data;
        this.pageOptions.page = 0;
        this.pageOptions.size = 20;
        console.log("filtres ", this.pageOptions)
        this.getAllModules();
        this.modalService.dismissAll();
      }

}
