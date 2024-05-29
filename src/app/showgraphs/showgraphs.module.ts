import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowgraphsRoutingModule } from './showgraphs-routing.module';
import { ShowgraphsComponent } from './showgraphs.component';
import { VideComponent } from './vide/vide.component';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ShowgraphsComponent, VideComponent],
  imports: [
    CommonModule,
    ShowgraphsRoutingModule,
    FormsModule, // Import FormsModule for template-driven forms
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule

  ]
})
export class ShowgraphsModule { }
