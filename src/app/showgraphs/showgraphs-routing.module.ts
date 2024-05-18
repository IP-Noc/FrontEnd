import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowgraphsComponent } from './showgraphs.component';

const routes: Routes = [
  
   
      {
        path:'showGraph/:id/:position/:company',
        component:ShowgraphsComponent
      },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowgraphsRoutingModule { }
