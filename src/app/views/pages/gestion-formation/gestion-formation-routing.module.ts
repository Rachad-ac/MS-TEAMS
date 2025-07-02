import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ListSessionFormationComponent
} from "./sessionFormation/list-session-formation/list-session-formation.component";
import { ListFormateurComponent } from './formateur/list-formateur/list-formateur.component';

const routes: Routes = [
  {path: '', component: ListSessionFormationComponent},
  {path: 'session-formation', component: ListSessionFormationComponent},
  {path: 'formateur', component: ListFormateurComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFormationRoutingModule { }
