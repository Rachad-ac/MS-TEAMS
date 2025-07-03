import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ListSessionFormationComponent
} from "./sessionFormation/list-session-formation/list-session-formation.component";

const routes: Routes = [
  {path: '', component: ListSessionFormationComponent},
  {path: 'session-formation', component: ListSessionFormationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFormationRoutingModule { }
