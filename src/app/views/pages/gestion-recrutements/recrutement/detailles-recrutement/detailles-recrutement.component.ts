import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecrutementService} from "../../../../../services/recrutement/recrutement.service";
import {Alertes} from "../../../../../util/alerte";

@Component({
  selector: 'app-detailles-recrutement',
  templateUrl: './detailles-recrutement.component.html',
  styleUrls: ['./detailles-recrutement.component.scss']
})
export class DetaillesRecrutementComponent implements OnInit {

  recrutement: any = null;
  displayedColumnsCompetence: string[] = ['nom', 'niveau', 'domaine'];

  constructor(private activateRoute: ActivatedRoute,
              private recrutementService: RecrutementService) {}

  ngOnInit(): void {
    const recrutementId = this.activateRoute.snapshot.paramMap.get('id');
    if (recrutementId != null) {
      localStorage.setItem('recrutementId', recrutementId);
    }
    this.recrutementService.getRecrutementId(recrutementId).subscribe({
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
