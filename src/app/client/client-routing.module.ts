import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { DashComponent } from './dash/dash.component';
import { ListempComponent } from './employees/listemp/listemp.component';
import { AddempComponent } from './employees/addemp/addemp.component';
import { AddsubmanagerComponent } from './sub-manager/addsubmanager/addsubmanager.component';
import { ListsubmanagerComponent } from './sub-manager/listsubmanager/listsubmanager.component';
import { AddnocComponent } from './nocroom/addnoc/addnoc.component';
import { ListnocComponent } from './nocroom/listnoc/listnoc.component';
import { CodeComponent } from './code/code.component';
import { EditnocComponent } from './nocroom/editnoc/editnoc.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        component: DashComponent
      },
      {
        path: 'dashboard',
        component: DashComponent
      },
      {
        path: 'Listemployees',
        component: ListempComponent
      },
      {
        path: 'Addemployees',
        component: AddempComponent
      },
    {
      path: 'Addsubmanager',
      component:AddsubmanagerComponent
    },
    {
      path: 'Listsubmanager',
      component:ListsubmanagerComponent
    },{
      path: 'AddNocRoom',
      component:AddnocComponent
    },
    {
      path: 'NocRoom',
      component:ListnocComponent
    },

    {
      path:'NocRoom/:id',
      component:EditnocComponent
    },
    {
      path:'Code',
      component:CodeComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
