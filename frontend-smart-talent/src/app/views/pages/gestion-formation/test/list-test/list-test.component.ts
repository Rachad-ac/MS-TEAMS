import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestService } from 'src/app/services/test/test.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent {
displayedColumns: string[] = [
    'type',
    'date',
    'bareme',
    'formation',
    'actions',
  ];

  
    testToUpdate: any; 
    pageOptions: any = { page: 0, size: 10, formationId: null };
    dataSource: any;
    loadingIndicator = true;
    @Input() formationId: any;
  
    constructor(
      private modalService: NgbModal,
      private testServices: TestService
    ) { }
  
    ngOnInit(): void {
      this.getAllTests();
    }

   getAllTests(): void {
  this.loadingIndicator = true;
  this.pageOptions.formationId = this.formationId;
        this.pageOptions.page = 0;
        this.pageOptions.size = 10;
  this.testServices.getAllTests(this.pageOptions).subscribe({
    next: response => {
      console.log('responseF', response);
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
      this.getAllTests();
    }

    openAddTest(content: TemplateRef<any>): void {
      this.openModal(content, 'lg');
    }

    openEditTest(content: TemplateRef<any>, rTest: any): void {
      this.testToUpdate = rTest;
      this.openModal(content, 'lg');
    }
  
    openModal(content: TemplateRef<any>, size: 'sm' | 'lg' | 'xl'): void {
      this.modalService.open(content, { size, backdrop: 'static' }).result.then(
        () => {},
        () => {}
      );
    }

    deleteTest(rTest: any): void {
      Alertes.confirmAction(
        'Voulez-vous supprimer ?',
        'Cet élément sera définitivement supprimé',
        () => {
          this.testServices.deleteTest(rTest).subscribe({
            next: () => {
              Alertes.alerteAddSuccess('Suppression réussie');
            },
            error: (err) => {
              Alertes.alerteAddDanger(err?.error?.message || 'Erreur de suppression');
            },
            complete: () => {
              this.getAllTests();
            }
          });
        }
      );
    }
  
    close(): void {
      this.modalService.dismissAll();
      this.getAllTests();
    }
  
    doSearch(data: any): void {
      this.pageOptions = {
        ...data,
        page: 0,
        size: 20
      };
      console.log("Filtres appliqués : ", this.pageOptions);
      this.getAllTests();
      this.modalService.dismissAll();
    }

}
