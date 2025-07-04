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
import {NgbDropdownModule, NgbNavModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { AddSessionFormationComponent } from './sessionFormation/add-session-formation/add-session-formation.component';
import { AddModuleComponent } from './Module/add-module/add-module.component';
import { EditModuleComponent } from './Module/edit-module/edit-module.component';
import { ListModuleComponent } from './Module/list-module/list-module.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {ReactiveFormsModule} from "@angular/forms";
import { ListFormationComponent } from './formation/list-formation/list-formation.component';
import { AddFormationComponent } from './formation/add-formation/add-formation.component';
import { DetaillesFormationComponent } from './formation/detailles-formation/detailles-formation.component';
import { AddTestComponent } from './test/add-test/add-test.component';
import { EditTestComponent } from './test/edit-test/edit-test.component';
import { ListTestComponent } from './test/list-test/list-test.component';



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
    ListTestComponent
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
    NgbDropdownModule,
    NgbNavModule
  ]
})
export class GestionFormationModule { }
