import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRecrutementsRoutingModule } from './gestion-recrutements-routing.module';
import { ListOffreDEmploiComponent } from './offreEmploi/list-offre-d-emploi/list-offre-d-emploi.component';


@NgModule({
  declarations: [
    ListOffreDEmploiComponent,
  ],
  imports: [
    CommonModule,
    GestionRecrutementsRoutingModule
  ]
})
export class GestionRecrutementsModule { }
