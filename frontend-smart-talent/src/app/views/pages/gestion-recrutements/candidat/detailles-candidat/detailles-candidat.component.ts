import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ListCandidatComponent} from "../list-candidat/list-candidat.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-detailles-candidat',
  templateUrl: './detailles-candidat.component.html',
  styleUrls: ['./detailles-candidat.component.scss']
})
export class DetaillesCandidatComponent implements OnInit {
  recrutementId: any;
  @ViewChild(ListCandidatComponent) listCandidatComponent!: ListCandidatComponent;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    this.recrutementId = localStorage.getItem('recrutementId');
  }

  openAddCandidat(content: TemplateRef<any>): void {
    this.openModal(content, 'lg');
  }

  openModal(content: TemplateRef<any>, size: 'sm' | 'lg' | 'xl'): void {
    this.modalService.open(content, { size, backdrop: 'static' }).result.then(
      () => {},
      () => {}
    );
  }

  close(): void {
    this.modalService.dismissAll();
    this.listCandidatComponent.getAllCandidats();
  }
}
