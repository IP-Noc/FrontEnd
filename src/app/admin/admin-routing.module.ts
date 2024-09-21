import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashComponent } from './dash/dash.component';
import { NvclientComponent } from './client/nvclient/nvclient.component';
import { ListclientComponent } from './client/listclient/listclient.component';
import { AddsubmangerComponent } from './sub-admin/addsubmanger/addsubmanger.component';
import { ListsubmangerComponent } from './sub-admin/listsubmanger/listsubmanger.component';

const routes: Routes = [
  {
    path: '',
    component : AdminComponent,
    children: [
      {
        path: 'dashboard',
        component:DashComponent
      },
      {
        path:'',
        component:ListclientComponent
      },
      {
        path:'addClient',
        component:NvclientComponent
      },
      {
        path:'AllClients',
        component:ListclientComponent
      },
      {
        path:'addSubAdmin',
        component:AddsubmangerComponent
      },
      {
        path:'AllSubAdmin',
        component:ListsubmangerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
