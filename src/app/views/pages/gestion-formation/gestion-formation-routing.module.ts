import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListFormationComponent} from "./formation/list-formation/list-formation.component";
import {DetaillesFormationComponent} from "./formation/detailles-formation/detailles-formation.component";

const routes: Routes = [
  {path: '', component: ListFormationComponent},
  {path: 'formation', component: ListFormationComponent},
  {path: 'detaille-formation', component: DetaillesFormationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFormationRoutingModule { }
