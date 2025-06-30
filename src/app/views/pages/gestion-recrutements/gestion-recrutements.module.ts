import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Import des modules de routing et des composants nécessaires
import { GestionRecrutementsRoutingModule } from './gestion-recrutements-routing.module';
import { ListRecrutementComponent } from './recrutement/list-recrutement/list-recrutement.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DetaillesRecrutementComponent } from './recrutement/detailles-recrutement/detailles-recrutement.component';
import {AddRecrutementComponent} from "./recrutement/add-recrutement/add-recrutement.component";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  // Déclaration de tous les composants utilisés dans ce module
  declarations: [
    AddRecrutementComponent,
    ListRecrutementComponent,
    DetaillesRecrutementComponent,
  ],
  // Import des modules nécessaires pour ce module
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
// Module principal pour la gestion des recrutements et candidatures
export class GestionRecrutementsModule {}
