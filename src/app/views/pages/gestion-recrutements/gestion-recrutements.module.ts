import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRecrutementsRoutingModule } from './gestion-recrutements-routing.module';
import { ListRecrutementComponent } from './recrutement/list-recrutement/list-recrutement.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {NgbDropdownModule, NgbNavModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { DetaillesRecrutementComponent } from './recrutement/detailles-recrutement/detailles-recrutement.component';
import { AddRecrutementComponent } from './recrutement/add-recrutement/add-recrutement.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { AddCompetenceComponent } from './competence/add-competence/add-competence.component';
import { ListCompetenceComponent } from './competence/list-competence/list-competence.component';


@NgModule({
  declarations: [
    ListRecrutementComponent,
    DetaillesRecrutementComponent,
    AddRecrutementComponent,
    AddCompetenceComponent,
    ListCompetenceComponent,
  ],
  imports: [
    CommonModule,
    GestionRecrutementsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class GestionRecrutementsModule { }
