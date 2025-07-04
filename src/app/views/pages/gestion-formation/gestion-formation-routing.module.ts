import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFormationComponent } from './formation/list-formation/list-formation.component';
import { ListModuleComponent } from './Module/list-module/list-module.component';
import { DetaillesFormationComponent } from './formation/detailles-formation/detailles-formation.component';
import { ListTestComponent } from './test/list-test/list-test.component';
import { AddTestComponent } from './test/add-test/add-test.component';
import { EditTestComponent } from './test/edit-test/edit-test.component';

const routes: Routes = [
  {path: '', component: ListFormationComponent},
  {path: 'formation', component: ListFormationComponent},
  {path: 'module', component: ListModuleComponent},
  {path: 'detaille-formation', component: DetaillesFormationComponent},
   {path: 'test', component: ListTestComponent},
  //  {path: 'test', component: AddTestComponent},
  //  {path: 'test', component: EditTestComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFormationRoutingModule { }
