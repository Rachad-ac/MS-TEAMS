import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListRecrutementComponent} from "./recrutement/list-recrutement/list-recrutement.component";
import {DetaillesRecrutementComponent} from "./recrutement/detailles-recrutement/detailles-recrutement.component";
import { ListEvaluationComponent } from './evaluation/list-evaluation/list-evaluation.component';
import { AddEvaluationComponent } from './evaluation/add-evaluation/add-evaluation.component';
import { EditEvaluationComponent } from './evaluation/edit-evaluation/edit-evaluation.component';
import {DetaillesEvaluationComponent} from "./evaluation/detailles-evaluations/detailles-evaluation.component";
import { AddCandidatComponent } from './candidat/add-candidat/add-candidat.component';
import { ListCandidatComponent } from './candidat/list-candidat/list-candidat.component';
import { EditCandidatComponent } from './candidat/edit-candidat/edit-candidat.component';


const routes: Routes = [
  {path: '', component: ListRecrutementComponent},
  {path: 'recrutement', component: ListRecrutementComponent},
  {path: 'recrutement/:id', component: DetaillesRecrutementComponent},
  {path: 'evaluation', component: ListEvaluationComponent},
  {path: 'evaluation', component: AddEvaluationComponent},
  {path: 'evaluation', component: EditEvaluationComponent},
  {path: 'evaluation/:id', component: DetaillesEvaluationComponent},
  {path: 'detaille-valuation', component: DetaillesEvaluationComponent},
  {path: 'detaille-recrutement', component: DetaillesRecrutementComponent},
  {path: 'candidat', component: ListCandidatComponent},
  {path: 'candidat', component: AddCandidatComponent},
  {path: 'candidat', component: EditCandidatComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRecrutementsRoutingModule { }
