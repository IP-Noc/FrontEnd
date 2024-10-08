import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { DashComponent } from './dash/dash.component';
import { AddempComponent, CsvUploadModalComponent } from './employees/addemp/addemp.component';
import { ListempComponent } from './employees/listemp/listemp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddsubmanagerComponent } from './sub-manager/addsubmanager/addsubmanager.component';
import { ListsubmanagerComponent } from './sub-manager/listsubmanager/listsubmanager.component';
import { AddnocComponent, DialogContentExampleDialog, GrafanaConfiguration } from './nocroom/addnoc/addnoc.component';
import { ListnocComponent } from './nocroom/listnoc/listnoc.component';
import { CodeComponent } from './code/code.component';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EditnocComponent, GrafanaEditConfiguration } from './nocroom/editnoc/editnoc.component';
import { SafePipe } from './dash/safe.pipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ServicesaccountComponent } from './nocroom/servicesaccount/servicesaccount.component';


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
    EditnocComponent,CsvUploadModalComponent,
    SafePipe,
    GrafanaConfiguration,
    ServicesaccountComponent,
    GrafanaEditConfiguration
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,FormsModule,NgbPaginationModule, NgbTypeaheadModule,Ng2SearchPipeModule,NgbAlertModule,
    NgbDropdownModule,MatFormFieldModule,MatIconModule,MatButtonModule, MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,ReactiveFormsModule,MatDatepickerModule,MatIconModule,
    MatSelectModule,    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ClientModule { }
