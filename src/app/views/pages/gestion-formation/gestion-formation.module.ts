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
import { AddModuleComponent } from './Module/add-module/add-module.component';
import { EditModuleComponent } from './Module/edit-module/edit-module.component';
import { ListModuleComponent } from './Module/list-module/list-module.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListSessionFormationComponent,
    AddSessionFormationComponent,
    AddModuleComponent,
    EditModuleComponent,
    ListModuleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GestionFormationRoutingModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NgbPaginationModule
  ]
})
export class GestionFormationModule { }
