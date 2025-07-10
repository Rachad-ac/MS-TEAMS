import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EvaluationService} from "../../../../../services/evaluation/evaluation.service";
import {Alertes} from "../../../../../util/alerte";
import {ResultatService} from "../../../../../services/resultat/resultat.service";

@Component({
  selector: 'app-detaille-resultat',
  templateUrl: './detaille-resultat.component.html',
  styleUrls: ['./detaille-resultat.component.scss']
})
export class DetailleResultatComponent implements OnInit {

  resultats: any = null;
  resultatId: any;

  constructor(private activateRoute: ActivatedRoute,
              private resultatService: ResultatService) {}

  ngOnInit(): void {
    const resultatId = this.activateRoute.snapshot.paramMap.get('id');
    if (resultatId != null) {
      localStorage.setItem('resultatId', resultatId);
    }
    this.resultatService.getResultatById(resultatId).subscribe({
      next:(data) =>{
        console.log(data);
        this.resultats = data.payload;
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    });
  }

}
