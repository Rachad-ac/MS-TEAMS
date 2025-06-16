import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { ListAgentComponent } from './list-agent/list-agent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { EditAgentComponent } from './edit-agent/edit-agent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    ListAgentComponent,
    AddAgentComponent,
    EditAgentComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    NgbModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgSelectModule
  ]
})
export class AgentModule { }
