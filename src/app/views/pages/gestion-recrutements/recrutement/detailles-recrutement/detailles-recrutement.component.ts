import {Component, Input, OnInit} from '@angular/core';
import {RecrutementService} from "../../../../../services/recrutement/recrutement.service";
import {Alertes} from "../../../../../util/alerte";

@Component({
  selector: 'app-detailles-recrutement',
  templateUrl: './detailles-recrutement.component.html',
  styleUrls: ['./detailles-recrutement.component.scss']
})
export class DetaillesRecrutementComponent implements OnInit {

  recrutement: any = null;
  recrutementId: any;
  candidatToUpdate: any;
  evaluationToUpdate: any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  loadingIndicator = true;
  @Input() statutCandidature: any;

  constructor(private recrutementService: RecrutementService) {}

  ngOnInit(): void {
    this.recrutementId = localStorage.getItem('recrutementId');
    this.recrutementService.getRecrutementId(this.recrutementId).subscribe({
      next:(data) =>{
        console.log(data);
        this.recrutement = data.payload;
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    });
  }


}
