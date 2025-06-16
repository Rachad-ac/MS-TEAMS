import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListOffreDEmploiComponent} from "./offreEmploi/list-offre-d-emploi/list-offre-d-emploi.component";
import {
  ListSessionFormationComponent
} from "./sessionFormation/list-session-formation/list-session-formation.component";

const routes: Routes = [
  {path: '', component: ListOffreDEmploiComponent},
  {path: 'offre-emploi', component: ListOffreDEmploiComponent},
  {path: 'session-recrutement', component: ListSessionFormationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRecrutementsRoutingModule { }
