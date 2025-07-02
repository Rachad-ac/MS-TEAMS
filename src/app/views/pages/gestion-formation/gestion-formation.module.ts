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
import { AddFormateurComponent } from './formateur/add-formateur/add-formateur.component';
import { ListFormateurComponent } from './formateur/list-formateur/list-formateur.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListSessionFormationComponent,
    AddSessionFormationComponent,
    AddFormateurComponent,
    ListFormateurComponent
  ],
  imports: [
    CommonModule,
    GestionFormationRoutingModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NgbPaginationModule, 
    ReactiveFormsModule
  ]
})
export class GestionFormationModule { }
