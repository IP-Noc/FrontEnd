import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReqresetComponent } from './auth/reqreset/reqreset.component';
import { ResetService } from './services/auth/reset.service';
import { HttpClientModule } from '@angular/common/http';
import { CodeComponent } from './auth/code/code.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionManagerService } from './services/session/session-manager.service';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { ChangepwdreqComponent } from './auth/changepwdreq/changepwdreq.component';
import { CheckpwdComponent } from './auth/checkpwd/checkpwd.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReqresetComponent,
    CodeComponent,
    ChangepwdreqComponent,
    CheckpwdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule,HttpClientModule, BrowserAnimationsModule,
     MaterialExampleModule,NzTableModule,Ng2SearchPipeModule, NgbModule, ReactiveFormsModule
  ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    ResetService, { provide: NZ_I18N, useValue: en_US }, CookieService,JwtHelperService,SessionManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
