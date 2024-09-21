import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
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
