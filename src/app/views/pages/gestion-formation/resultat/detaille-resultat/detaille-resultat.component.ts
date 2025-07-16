import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Alertes} from "../../../../../util/alerte";
import {ResultatService} from "../../../../../services/resultat/resultat.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-detaille-resultat',
  templateUrl: './detaille-resultat.component.html',
  styleUrls: ['./detaille-resultat.component.scss']
})
export class DetailleResultatComponent implements OnInit {

  resultats: any = null;
  resultatId: any;
  resultatToUpdate: any;

  constructor(private activateRoute: ActivatedRoute,
              private modalService: NgbModal,
              private resultatService: ResultatService) {}

  ngOnInit(): void {
    this.getResultatById();
  }

  getResultatById(){
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
