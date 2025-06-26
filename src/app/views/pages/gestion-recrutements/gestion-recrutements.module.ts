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


@NgModule({
  declarations: [
    ListRecrutementComponent,
    DetaillesRecrutementComponent,
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
    NgbDropdownModule
  ]
})
export class GestionRecrutementsModule { }
