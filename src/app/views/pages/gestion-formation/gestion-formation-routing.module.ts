import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ListSessionFormationComponent
} from "./sessionFormation/list-session-formation/list-session-formation.component";
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { DetaillesEmployeComponent } from './employe/detailles-employe/detailles-employe.component';
import { ListInscriptionComponent } from './inscription/list-inscription/list-inscription.component';
import { DetaillesInscriptionComponent } from './inscription/detailles-inscription/detailles-inscription.component';

const routes: Routes = [
  {path: '', component: ListSessionFormationComponent},
  {path: 'session-formation', component: ListSessionFormationComponent},
  { path: 'employes', component: ListEmployeComponent },
  { path: 'employes/:id', component: DetaillesEmployeComponent },
  { path: 'inscriptions', component: ListInscriptionComponent },
  { path: 'inscriptions/:id', component: DetaillesInscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFormationRoutingModule { }
