import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRecrutementComponent } from './recrutement/list-recrutement/list-recrutement.component';
import { DetaillesRecrutementComponent } from './recrutement/detailles-recrutement/detailles-recrutement.component';
import { ListCandidatureComponent } from './candidature/list-candidature/list-candidature.component';
import { DetaillesCandidatureComponent } from './candidature/detailles-candidature/detailles-candidature.component';

// Définition des routes pour la gestion des recrutements et candidatures
const routes: Routes = [
  // Routes pour les recrutements
  { path: '', component: ListRecrutementComponent },
  { path: 'recrutement', component: ListRecrutementComponent },
  { path: 'recrutement/:id', component: DetaillesRecrutementComponent },
  // Routes pour les candidatures
  { path: 'candidature', component: ListCandidatureComponent },
  { path: 'candidature/:id', component: DetaillesCandidatureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// Module de routing pour la gestion des recrutements et candidatures
export class GestionRecrutementsRoutingModule {}
