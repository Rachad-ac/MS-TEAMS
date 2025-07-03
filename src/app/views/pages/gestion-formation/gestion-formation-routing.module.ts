import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFormationRoutingModule { }
