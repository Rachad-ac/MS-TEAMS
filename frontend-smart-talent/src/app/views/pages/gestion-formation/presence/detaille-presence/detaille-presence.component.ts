import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ResultatService} from "../../../../../services/resultat/resultat.service";
import {Alertes} from "../../../../../util/alerte";
import {PresenceService} from "../../../../../services/presence/presence.service";

@Component({
  selector: 'app-detaille-presence',
  templateUrl: './detaille-presence.component.html',
  styleUrls: ['./detaille-presence.component.scss']
})
export class DetaillePresenceComponent {

  presences: any = null;
  presenceId: any;

  constructor(private activateRoute: ActivatedRoute,
              private presenceService: PresenceService) {}

  ngOnInit(): void {
    const presenceId = this.activateRoute.snapshot.paramMap.get('id');
    if (presenceId != null) {
      localStorage.setItem('presenceId', presenceId);
    }
    this.presenceService.getPresenceById(presenceId).subscribe({
      next:(data) =>{
        console.log(data);
        this.presences = data.payload;
      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }
    });
  }

}
