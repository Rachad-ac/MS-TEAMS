import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { ListInscriptionComponent } from './inscription/list-inscription/list-inscription.component';
import {ListFormationComponent} from "./formation/list-formation/list-formation.component";
import {DetaillesFormationComponent} from "./formation/detailles-formation/detailles-formation.component";

const routes: Routes = [
  { path: '', component: ListFormationComponent },
  { path: 'formation', component: ListFormationComponent },
  { path: 'detaille-formation', component: DetaillesFormationComponent },
  { path: 'employes', component: ListEmployeComponent },
  { path: 'inscriptions', component: ListInscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionFormationRoutingModule {}
