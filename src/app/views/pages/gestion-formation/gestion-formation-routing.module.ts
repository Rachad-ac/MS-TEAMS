import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListModuleComponent } from './Module/list-module/list-module.component';
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
import {ListFormationComponent} from "./formation/list-formation/list-formation.component";
import {DetaillesFormationComponent} from "./formation/detailles-formation/detailles-formation.component";
import { ListFormateurComponent } from './formateur/list-formateur/list-formateur.component';
import {AddEmployeComponent} from "./employe/add-employe/add-employe.component";
import {EditEmployeComponent} from "./employe/edit-employe/edit-employe.component";
import {
  DetaillesEvaluationComponent
} from "../gestion-recrutements/evaluation/detailles-evaluations/detailles-evaluation.component";

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
  {path: 'presence/:id', component: DetaillePresenceComponent},
  {path: 'detaille-presence', component: DetaillePresenceComponent},

  {path: 'resultat', component: ListResultatComponent},
  {path: 'resultat', component: AddResultatComponent},
  {path: 'resultat', component: EditResultatComponent},
  {path: 'resultat/:id', component: DetailleResultatComponent},
  {path: 'detaille-resultat', component: DetailleResultatComponent},

  { path: 'employe', component: ListEmployeComponent },
  { path: 'employe', component: AddEmployeComponent },
  { path: 'employe', component: EditEmployeComponent },

  { path: 'inscriptions', component: ListInscriptionComponent },
  { path: '', component: ListFormationComponent },

  { path: 'formation', component: ListFormationComponent },
  { path: 'detaille-formation', component: DetaillesFormationComponent },
  {path: 'formateur', component: ListFormateurComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionFormationRoutingModule {}
