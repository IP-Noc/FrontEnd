import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  Code!: string;

  constructor(
    private sessionManagerService: SessionManagerService,
    private auth: LoginService,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) {}

  getCode() {
    this.zone.run(() => {
      this.Code = this.sessionManagerService.getData().code;
      this.cd.detectChanges();
    });
  }

  resendCode() {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.auth.resendCode(email).subscribe((res) => {
        this.zone.run(() => {
          console.log(res);
          this.sessionManagerService.saveCode(res.toString()); // Save the new code
          this.Code = res.toString(); // Update the component's Code property
          this.cd.detectChanges();
        });
      });
    }
  }

  ngOnInit(): void {
    this.getCode();
  }
}
