import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFormationComponent } from './formation/list-formation/list-formation.component';
import { ListModuleComponent } from './Module/list-module/list-module.component';
import { DetaillesFormationComponent } from './formation/detailles-formation/detailles-formation.component';
import { ListTestComponent } from './test/list-test/list-test.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { ListInscriptionComponent } from './inscription/list-inscription/list-inscription.component';
import {
  ListSessionFormationComponent
} from "./sessionFormation/list-session-formation/list-session-formation.component";
import {ListPresenceComponent} from "./presence/list-presence/list-presence.component";
import {ListResultatComponent} from "./resultat/list-resultat/list-resultat.component";
import {DetailleResultatComponent} from "./resultat/detaille-resultat/detaille-resultat.component";
import {DetaillePresenceComponent} from "./presence/detaille-presence/detaille-presence.component";
import {AddPresenceComponent} from "./presence/add-presence/add-presence.component";
import {EditPresenceComponent} from "./presence/edit-presence/edit-presence.component";
import {AddResultatComponent} from "./resultat/add-resultat/add-resultat.component";
import {EditResultatComponent} from "./resultat/edit-resultat/edit-resultat.component";


const routes: Routes = [
  {path: '', component: ListFormationComponent},
  {path: 'formation', component: ListFormationComponent},
  {path: 'module', component: ListModuleComponent},
  {path: 'detaille-formation', component: DetaillesFormationComponent},
  {path: 'test', component: ListTestComponent},
  {path: '', component: ListSessionFormationComponent},
  {path: 'session-formation', component: ListSessionFormationComponent},
  {path: 'presence', component: ListPresenceComponent},
  {path: 'presence', component: AddPresenceComponent},
  {path: 'presence', component: EditPresenceComponent},
  {path: 'detaille-presence', component: DetaillePresenceComponent},
  {path: 'resultat', component: ListResultatComponent},
  {path: 'resultat', component: AddResultatComponent},
  {path: 'resultat', component: EditResultatComponent},
  {path: 'detaille-resultat', component: DetailleResultatComponent},
  { path: '', component: ListSessionFormationComponent },
  { path: 'session-formation', component: ListSessionFormationComponent },
  { path: 'employes', component: ListEmployeComponent },
  { path: 'inscriptions', component: ListInscriptionComponent },
  { path: '', component: ListFormationComponent },
  { path: 'formation', component: ListFormationComponent },
  { path: 'detaille-formation', component: DetaillesFormationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionFormationRoutingModule {}
