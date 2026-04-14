import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CandidatService} from "../../../../../services/candidat/candidat.service";
import {Alertes} from "../../../../../util/alerte";

@Component({
  selector: 'app-infos-candidat',
  templateUrl: './infos-candidat.component.html',
  styleUrls: ['./infos-candidat.component.scss']
})
export class InfosCandidatComponent implements OnInit {
  candidat: any = null;
  @Input() candidatId: any;

  constructor(private activateRoute: ActivatedRoute,
              private candidatService: CandidatService) {}

  ngOnInit(): void {
    this.candidatService.getCandidatById(this.candidatId).subscribe({
      next:(data) =>{
        console.log(data);
        this.candidat = data.payload;
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    });
  }
}
