import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRecrutementComponent } from './recrutement/list-recrutement/list-recrutement.component';
import { DetaillesRecrutementComponent } from './recrutement/detailles-recrutement/detailles-recrutement.component';
import { ListCandidatureComponent } from './candidature/list-candidature/list-candidature.component';
import { DetaillesCandidatureComponent } from './candidature/detailles-candidature/detailles-candidature.component';

const routes: Routes = [
  { path: '', component: ListRecrutementComponent },
  { path: 'recrutement', component: ListRecrutementComponent },
  { path: 'detaille-recrutement', component: DetaillesRecrutementComponent },
  { path: 'candidature', component: ListCandidatureComponent },
  { path: 'candidature/:id', component: DetaillesCandidatureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRecrutementsRoutingModule {}
