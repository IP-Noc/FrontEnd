import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashComponent } from './dash/dash.component';
import { MaterialExampleModule } from '../material.module';
import { NvclientComponent } from './client/nvclient/nvclient.component';
import { ListclientComponent } from './client/listclient/listclient.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AddsubmangerComponent } from './sub-admin/addsubmanger/addsubmanger.component';
import { ListsubmangerComponent } from './sub-admin/listsubmanger/listsubmanger.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashComponent,
    NvclientComponent,
    ListclientComponent,
    AddsubmangerComponent,
    ListsubmangerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialExampleModule,NzTableModule, FormsModule,NgbPaginationModule, NgbTypeaheadModule,Ng2SearchPipeModule,ReactiveFormsModule
  ]
})
export class AdminModule { }
