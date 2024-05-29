import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
