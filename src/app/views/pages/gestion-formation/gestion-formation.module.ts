import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFormationRoutingModule } from './gestion-formation-routing.module';
import {
  ListSessionFormationComponent
} from "./sessionFormation/list-session-formation/list-session-formation.component";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { AddSessionFormationComponent } from './sessionFormation/add-session-formation/add-session-formation.component';
import { AddResultatComponent } from './resultat/add-resultat/add-resultat.component';
import { ListResultatComponent } from './resultat/list-resultat/list-resultat.component';
import { EditResultatComponent } from './resultat/edit-resultat/edit-resultat.component';
import { DetailleResultatComponent } from './resultat/detaille-resultat/detaille-resultat.component';
import { DetaillePresenceComponent } from './presence/detaille-presence/detaille-presence.component';
import { AddPresenceComponent } from './presence/add-presence/add-presence.component';
import { EditPresenceComponent } from './presence/edit-presence/edit-presence.component';
import { ListPresenceComponent } from './presence/list-presence/list-presence.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@progress/kendo-angular-dropdowns";


@NgModule({
  declarations: [
    ListSessionFormationComponent,
    AddSessionFormationComponent,
    AddResultatComponent,
    ListResultatComponent,
    EditResultatComponent,
    DetailleResultatComponent,
    DetaillePresenceComponent,
    AddPresenceComponent,
    EditPresenceComponent,
    ListPresenceComponent
  ],
  imports: [
    CommonModule,
    GestionFormationRoutingModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NgbPaginationModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GestionFormationModule { }
