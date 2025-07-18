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
import { AddCandidatComponent } from './candidat/add-candidat/add-candidat.component';
import { ListCandidatComponent } from './candidat/list-candidat/list-candidat.component';
import { EditCandidatComponent } from './candidat/edit-candidat/edit-candidat.component';
import {InfosCandidatComponent} from "./candidat/infos-candidat/infos-candidat.component";
import {ListDomaineComponent} from "./domaine/list-domaine/list-domaine.component";

import {ListCompetenceComponent} from "./competence/list-competence/list-competence.component";
import {AddCompetenceComponent} from "./competence/add-competence/add-competence.component";

import {AddDomaineComponent} from "./domaine/add-domaine/add-domaine.component";
import {EditDomaineComponent} from "./domaine/edit-domaine/edit-domaine.component";
const routes: Routes = [
  {path: '', component: ListRecrutementComponent},
  {path: 'recrutement', component: ListRecrutementComponent},
  {path: 'detaille-recrutement', component: DetaillesRecrutementComponent},

  {path: 'domaine', component: ListDomaineComponent},
  {path: 'domaine', component: AddDomaineComponent},
  {path: 'domaine', component: EditDomaineComponent},

  {path: 'competence', component: ListCompetenceComponent},
  {path: 'competence', component: AddCompetenceComponent},

  {path: 'evaluation', component: ListEvaluationComponent},
  {path: 'evaluation', component: AddEvaluationComponent},
  {path: 'evaluation', component: EditEvaluationComponent},
  {path: 'evaluation/:id', component: DetaillesEvaluationComponent},
  {path: 'detaille-evaluation', component: DetaillesEvaluationComponent},

  {path: 'candidat', component: ListCandidatComponent},
  {path: 'candidat', component: AddCandidatComponent},
  {path: 'candidat', component: EditCandidatComponent},

  {path: 'competence', component: ListCompetenceComponent},
  {path: 'competence', component: AddCompetenceComponent},

  { path: 'candidature', component: ListCandidatureComponent },
  { path: 'candidature/add', component: AddEditCandidatureComponent },
  { path: 'candidature/edit/:id', component: AddEditCandidatureComponent },
  { path: 'candidature/:id', component: DetaillesCandidatureComponent },
  { path: 'infos-candidat', component: InfosCandidatComponent },

  {path: 'domaine', component: ListDomaineComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRecrutementsRoutingModule {}
