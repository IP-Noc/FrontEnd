import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowgraphsRoutingModule } from './showgraphs-routing.module';
import { ShowgraphsComponent } from './showgraphs.component';
import { VideComponent } from './vide/vide.component';


@NgModule({
  declarations: [ShowgraphsComponent, VideComponent],
  imports: [
    CommonModule,
    ShowgraphsRoutingModule
  ]
})
export class ShowgraphsModule { }
