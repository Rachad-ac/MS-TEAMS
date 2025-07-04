import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { GestionFormationRoutingModule } from './gestion-formation-routing.module';
import { ListSessionFormationComponent } from './sessionFormation/list-session-formation/list-session-formation.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {NgbModule, NgbNavModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { AddSessionFormationComponent } from './sessionFormation/add-session-formation/add-session-formation.component';

import { AddModuleComponent } from './Module/add-module/add-module.component';
import { EditModuleComponent } from './Module/edit-module/edit-module.component';
import { ListModuleComponent } from './Module/list-module/list-module.component';
import { ListFormationComponent } from './formation/list-formation/list-formation.component';
import { AddFormationComponent } from './formation/add-formation/add-formation.component';
import { DetaillesFormationComponent } from './formation/detailles-formation/detailles-formation.component';
import { AddTestComponent } from './test/add-test/add-test.component';
import { EditTestComponent } from './test/edit-test/edit-test.component';
import { ListTestComponent } from './test/list-test/list-test.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { AddEditEmployeComponent } from './employe/add-edit-employe/add-edit-employe.component';
import { ListInscriptionComponent } from './inscription/list-inscription/list-inscription.component';
import { AddEditInscriptionComponent } from './inscription/add-edit-inscription/add-edit-inscription.component';
import { AddResultatComponent } from './resultat/add-resultat/add-resultat.component';
import { ListResultatComponent } from './resultat/list-resultat/list-resultat.component';
import { EditResultatComponent } from './resultat/edit-resultat/edit-resultat.component';
import { DetailleResultatComponent } from './resultat/detaille-resultat/detaille-resultat.component';
import { DetaillePresenceComponent } from './presence/detaille-presence/detaille-presence.component';
import { AddPresenceComponent } from './presence/add-presence/add-presence.component';
import { EditPresenceComponent } from './presence/edit-presence/edit-presence.component';
import { ListPresenceComponent } from './presence/list-presence/list-presence.component';
import {SharedModule} from "@progress/kendo-angular-dropdowns";
import {ListFormateurComponent} from "./formateur/list-formateur/list-formateur.component";
import {AddFormateurComponent} from "./formateur/add-formateur/add-formateur.component";


@NgModule({
  declarations: [
    ListSessionFormationComponent,
    AddSessionFormationComponent,
    AddModuleComponent,
    EditModuleComponent,
    ListModuleComponent,
    ListFormationComponent,
    AddFormationComponent,
    DetaillesFormationComponent,
    AddTestComponent,
    EditTestComponent,
    ListTestComponent,
    AddSessionFormationComponent,
    ListEmployeComponent,
    AddEditEmployeComponent,
    ListInscriptionComponent,
    AddEditInscriptionComponent,
    AddSessionFormationComponent,
    AddResultatComponent,
    ListResultatComponent,
    EditResultatComponent,
    DetailleResultatComponent,
    DetaillePresenceComponent,
    AddPresenceComponent,
    EditPresenceComponent,
    ListPresenceComponent,
    ListFormationComponent,
    AddFormationComponent,
    DetaillesFormationComponent,
    ListFormateurComponent,
    AddFormateurComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GestionFormationRoutingModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NgbPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule,
    NgbNavModule
    
  ],
})
export class GestionFormationModule {}
