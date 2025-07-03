import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { GestionFormationRoutingModule } from './gestion-formation-routing.module';
import { ListSessionFormationComponent } from './sessionFormation/list-session-formation/list-session-formation.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddSessionFormationComponent } from './sessionFormation/add-session-formation/add-session-formation.component';
<<<<<<< HEAD

=======
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { AddEditEmployeComponent } from './employe/add-edit-employe/add-edit-employe.component';
import { ListInscriptionComponent } from './inscription/list-inscription/list-inscription.component';
import { AddEditInscriptionComponent } from './inscription/add-edit-inscription/add-edit-inscription.component';
>>>>>>> dev

@NgModule({
  declarations: [
    ListSessionFormationComponent,
<<<<<<< HEAD
    AddSessionFormationComponent
=======
    AddSessionFormationComponent,
    ListEmployeComponent,
    AddEditEmployeComponent,
    ListInscriptionComponent,
    AddEditInscriptionComponent,
>>>>>>> dev
  ],
  imports: [
    CommonModule,
    GestionFormationRoutingModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
<<<<<<< HEAD
    NgbPaginationModule
  ]
=======
    NgbPaginationModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule,
  ],
>>>>>>> dev
})
export class GestionFormationModule {}
