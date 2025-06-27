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
import { AddEvaluationComponent } from './evaluation/add-evaluation/add-evaluation.component';
import { ListEvaluationComponent } from './evaluation/list-evaluation/list-evaluation.component';
import { EditEvaluationComponent } from './evaluation/edit-evaluation/edit-evaluation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { DetaillesEvaluationComponent } from './evaluation/detailles-evaluation/detailles-evaluation/detailles-evaluation.component';



@NgModule({
  declarations: [
    ListRecrutementComponent,
    DetaillesRecrutementComponent,
    AddEvaluationComponent,
    ListEvaluationComponent,
    EditEvaluationComponent,
    DetaillesEvaluationComponent,
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
    NgSelectModule,
    ReactiveFormsModule
  
  ]
})
export class GestionRecrutementsModule { }
