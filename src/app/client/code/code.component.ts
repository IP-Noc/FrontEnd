import { LoginService } from 'src/app/services/auth/login.service';
import { SessionManagerService } from './../../services/session/session-manager.service';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  Code!: any;

  constructor(
    private sessionManagerService: SessionManagerService,
    private auth: LoginService,
    private zone: NgZone,

    private cd: ChangeDetectorRef
  ) {}

  getCode() {
    this.zone.run(() => {
      this.Code = sessionStorage.getItem('code')?.toString();
    });
  }

  resendCode() {
    this.auth.resendCode(sessionStorage.getItem('email')!).subscribe((res) => {
      this.zone.run(() => {
        console.log(res);
        sessionStorage.setItem('code', res.toString());
        this.getCode();
      });
    });
  }

  ngOnInit(): void {
    this.getCode();
  }

}
