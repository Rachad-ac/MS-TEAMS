import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { ListInscriptionComponent } from './inscription/list-inscription/list-inscription.component';
import {
  ListSessionFormationComponent
} from "./sessionFormation/list-session-formation/list-session-formation.component";
import {ListPresenceComponent} from "./presence/list-presence/list-presence.component";
import {ListResultatComponent} from "./resultat/list-resultat/list-resultat.component";
import {DetailleResultatComponent} from "./resultat/detaille-resultat/detaille-resultat.component";
import {DetaillePresenceComponent} from "./presence/detaille-presence/detaille-presence.component";

const routes: Routes = [
  {path: '', component: ListSessionFormationComponent},
  {path: 'session-formation', component: ListSessionFormationComponent},
  {path: '', component: ListPresenceComponent},
  {path: 'presence', component: ListPresenceComponent},
  {path: 'detaille-presence', component: DetaillePresenceComponent},
  {path: '', component: ListResultatComponent},
  {path: 'resultat', component: ListResultatComponent},
  {path: 'detaille-resultat', component: DetailleResultatComponent},
  { path: '', component: ListSessionFormationComponent },
  { path: 'session-formation', component: ListSessionFormationComponent },
  { path: 'employes', component: ListEmployeComponent },
  { path: 'inscriptions', component: ListInscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionFormationRoutingModule {}
