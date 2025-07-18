import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRecrutementComponent } from './recrutement/list-recrutement/list-recrutement.component';
import { DetaillesRecrutementComponent } from './recrutement/detailles-recrutement/detailles-recrutement.component';
import { ListEvaluationComponent } from './evaluation/list-evaluation/list-evaluation.component';
import { DetaillesEvaluationComponent } from './evaluation/detailles-evaluations/detailles-evaluation.component';
import { ListCandidatComponent } from './candidat/list-candidat/list-candidat.component';
import {ListDomaineComponent} from "./domaine/list-domaine/list-domaine.component";

import {ListCompetenceComponent} from "./competence/list-competence/list-competence.component";
const routes: Routes = [
  {path: '', component: ListRecrutementComponent},
  {path: 'recrutement', component: ListRecrutementComponent},
  {path: 'detaille-recrutement', component: DetaillesRecrutementComponent},
  {path: 'competence', component: ListCompetenceComponent},
  {path: 'evaluation', component: ListEvaluationComponent},
  {path: 'evaluation/:id', component: DetaillesEvaluationComponent},
  {path: 'detaille-evaluation', component: DetaillesEvaluationComponent},
  {path: 'candidat', component: ListCandidatComponent},
  {path: 'domaine', component: ListDomaineComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRecrutementsRoutingModule {}
