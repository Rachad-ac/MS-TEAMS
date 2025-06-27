import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListRecrutementComponent} from "./recrutement/list-recrutement/list-recrutement.component";
import {DetaillesRecrutementComponent} from "./recrutement/detailles-recrutement/detailles-recrutement.component";

const routes: Routes = [
  {path: '', component: ListRecrutementComponent},
  {path: 'recrutement', component: ListRecrutementComponent},
  {path: 'detaille-recrutement', component: DetaillesRecrutementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRecrutementsRoutingModule { }
