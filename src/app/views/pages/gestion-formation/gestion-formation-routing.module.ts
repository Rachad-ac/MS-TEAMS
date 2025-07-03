import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import {
  ListSessionFormationComponent
} from "./sessionFormation/list-session-formation/list-session-formation.component";

const routes: Routes = [
  {path: '', component: ListSessionFormationComponent},
  {path: 'session-formation', component: ListSessionFormationComponent},
=======
import { ListSessionFormationComponent } from './sessionFormation/list-session-formation/list-session-formation.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { ListInscriptionComponent } from './inscription/list-inscription/list-inscription.component';

const routes: Routes = [
  { path: '', component: ListSessionFormationComponent },
  { path: 'session-formation', component: ListSessionFormationComponent },
  { path: 'employes', component: ListEmployeComponent },
  { path: 'inscriptions', component: ListInscriptionComponent },
>>>>>>> dev
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionFormationRoutingModule {}
