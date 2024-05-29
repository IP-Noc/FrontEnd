import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminOnlyGuard } from './helpers/guards/adminGuards/admin-only.guard';
import { ReqresetComponent } from './auth/reqreset/reqreset.component';
import { CodeComponent } from './auth/code/code.component';
import { CompanyGuard } from './helpers/guards/clientGuards/student.guard';
import { EmployeGuardGuard } from './helpers/guards/employeeGuards/employe-guard.guard';
import { ChangepwdreqComponent } from './auth/changepwdreq/changepwdreq.component';
import { CheckpwdComponent } from './auth/checkpwd/checkpwd.component';
import { ShowgraphsComponent } from './showgraphs/showgraphs.component';
import { ManagerGuard } from './helpers/guards/ManagerGuards/manager.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset',
    component: ReqresetComponent
  },
  {
    path: '',
    component: LoginComponent

  },
  {
    path: 'checkCode',
    component: CodeComponent,
  },
  
  {
    path:'changePassword',
    component:ChangepwdreqComponent
  },
  {
    path:'check-pwd',
    component:CheckpwdComponent
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
   canActivate: [AdminOnlyGuard],
  },
  {
    path:'company',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
     canActivate: [CompanyGuard],
  },
  {
    path:'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
      canActivate: [EmployeGuardGuard],
  },
  {
    path:'graphs',
    loadChildren: () =>
      import('./showgraphs/showgraphs.module').then((m) => m.ShowgraphsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
