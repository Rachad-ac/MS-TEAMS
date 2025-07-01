import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRecrutementComponent } from './recrutement/list-recrutement/list-recrutement.component';
import { DetaillesRecrutementComponent } from './recrutement/detailles-recrutement/detailles-recrutement.component';
import { ListEvaluationComponent } from './evaluation/list-evaluation/list-evaluation.component';
import { AddEvaluationComponent } from './evaluation/add-evaluation/add-evaluation.component';
import { EditEvaluationComponent } from './evaluation/edit-evaluation/edit-evaluation.component';
import { DetaillesEvaluationComponent } from './evaluation/detailles-evaluations/detailles-evaluation.component';
import { ListCandidatureComponent } from './candidature/list-candidature/list-candidature.component';
import { AddEditCandidatureComponent } from './candidature/add-edit-candidature/add-edit-candidature.component';
import { DetaillesCandidatureComponent } from './candidature/detailles-candidature/detailles-candidature.component';

const routes: Routes = [
  { path: '', component: ListRecrutementComponent },
  { path: 'recrutement', component: ListRecrutementComponent },
  { path: 'recrutement/:id', component: DetaillesRecrutementComponent },
  { path: 'evaluation', component: ListEvaluationComponent },
  { path: 'evaluation/add', component: AddEvaluationComponent },
  { path: 'evaluation/edit/:id', component: EditEvaluationComponent },
  { path: 'evaluation/:id', component: DetaillesEvaluationComponent },
  { path: 'detaille-recrutement', component: DetaillesRecrutementComponent },
  { path: 'candidature', component: ListCandidatureComponent },
  { path: 'candidature/add', component: AddEditCandidatureComponent },
  { path: 'candidature/edit/:id', component: AddEditCandidatureComponent },
  { path: 'candidature/:id', component: DetaillesCandidatureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRecrutementsRoutingModule {}
