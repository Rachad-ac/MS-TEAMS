import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Alertes} from "../../../../../util/alerte";
import {EvaluationService} from "../../../../../services/evaluation/evaluation.service";

@Component({
  selector: 'app-detailles-evaluation',
  templateUrl: './detailles-evaluation.component.html',
  styleUrls: ['./detailles-evaluation.component.scss']
})
export class DetaillesEvaluationComponent implements OnInit {

  evaluation: any = null;
  evaluationId: any;

  constructor(private activateRoute: ActivatedRoute,
              private evaluationService: EvaluationService) {}

  ngOnInit(): void {
    const evaluationId = this.activateRoute.snapshot.paramMap.get('id');
    if (evaluationId != null) {
      localStorage.setItem('evaluationId', evaluationId);
    }
    this.evaluationService.getEvaluationById(evaluationId).subscribe({
      next:(data) =>{
        console.log(data);
        this.evaluation = data.payload;
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    });
  }
}
