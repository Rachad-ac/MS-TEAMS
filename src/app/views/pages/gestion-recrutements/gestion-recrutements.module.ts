import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRecrutementsRoutingModule } from './gestion-recrutements-routing.module';
import { ListOffreDEmploiComponent } from './offreEmploi/list-offre-d-emploi/list-offre-d-emploi.component';
import { ListSessionFormationComponent } from './sessionFormation/list-session-formation/list-session-formation.component';


@NgModule({
  declarations: [
    ListOffreDEmploiComponent,
    ListSessionFormationComponent
  ],
  imports: [
    CommonModule,
    GestionRecrutementsRoutingModule
  ]
})
export class GestionRecrutementsModule { }
