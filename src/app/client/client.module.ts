import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { DashComponent } from './dash/dash.component';
import { AddempComponent } from './employees/addemp/addemp.component';
import { ListempComponent } from './employees/listemp/listemp.component';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddsubmanagerComponent } from './sub-manager/addsubmanager/addsubmanager.component';
import { ListsubmanagerComponent } from './sub-manager/listsubmanager/listsubmanager.component';
import { AddnocComponent } from './nocroom/addnoc/addnoc.component';
import { ListnocComponent } from './nocroom/listnoc/listnoc.component';
import { CodeComponent } from './code/code.component';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EditnocComponent } from './nocroom/editnoc/editnoc.component';

@NgModule({
  declarations: [
    ClientComponent,
    DashComponent,
    ListempComponent,
    AddempComponent,
    AddsubmanagerComponent,
    ListsubmanagerComponent,
    AddnocComponent,
    ListnocComponent,
    CodeComponent,
    EditnocComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,FormsModule,NgbPaginationModule, NgbTypeaheadModule,Ng2SearchPipeModule,NgbAlertModule,
    NgbDropdownModule,
  ]
})
export class ClientModule { }
