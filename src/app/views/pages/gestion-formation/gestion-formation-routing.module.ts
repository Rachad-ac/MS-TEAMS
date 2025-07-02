import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ListSessionFormationComponent
} from "./sessionFormation/list-session-formation/list-session-formation.component";
import { ListModuleComponent } from './Module/list-module/list-module.component';
import { AddModuleComponent } from './Module/add-module/add-module.component';
import { EditModuleComponent } from './Module/edit-module/edit-module.component';

const routes: Routes = [
  {path: '', component: ListSessionFormationComponent},
  {path: 'session-formation', component: ListSessionFormationComponent},
  {path: 'module', component: ListModuleComponent},
  {path: 'module', component: AddModuleComponent},
  {path: 'module', component: EditModuleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFormationRoutingModule { }
