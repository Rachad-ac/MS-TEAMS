import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GestionFormationRoutingModule } from './gestion-formation-routing.module';
import { ListSessionFormationComponent } from './sessionFormation/list-session-formation/list-session-formation.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AddSessionFormationComponent } from './sessionFormation/add-session-formation/add-session-formation.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { DetaillesEmployeComponent } from './employe/detailles-employe/detailles-employe.component';
import { AddEditEmployeComponent } from './employe/add-edit-employe/add-edit-employe.component';
import { ListInscriptionComponent } from './inscription/list-inscription/list-inscription.component';
import { AddEditInscriptionComponent } from './inscription/add-edit-inscription/add-edit-inscription.component';
import { DetaillesInscriptionComponent } from './inscription/detailles-inscription/detailles-inscription.component';

@NgModule({
  declarations: [
    ListSessionFormationComponent,
    AddSessionFormationComponent,
    ListEmployeComponent,
    DetaillesEmployeComponent,
    AddEditEmployeComponent,
    ListInscriptionComponent,
    AddEditInscriptionComponent,
    DetaillesInscriptionComponent,
  ],
  imports: [
    CommonModule,
    GestionFormationRoutingModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    NgbPaginationModule,
    NgbModalModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [NgbActiveModal],
})
export class GestionFormationModule {}
