import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormationService} from "../../../../../services/formation/formation.service";
import {Alertes} from "../../../../../util/alerte";

@Component({
  selector: 'app-detailles-formation',
  templateUrl: './detailles-formation.component.html',
  styleUrls: ['./detailles-formation.component.scss']
})
export class DetaillesFormationComponent implements OnInit {

  formation: any = null;

  constructor(private activateRoute: ActivatedRoute,
              private formationService: FormationService) {}

  ngOnInit(): void {
    const formationId = localStorage.getItem('formationId');
    this.formationService.getFormationId(formationId).subscribe({
      next:(data) =>{
        console.log(data);
        this.formation = data.payload;
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    });
  }

}
