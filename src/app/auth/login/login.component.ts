import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import UserDetails from 'src/app/model/UserDetails';
import { LoginService } from 'src/app/services/auth/login.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  control = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  password!: string;
  //msgs1!: Message[];
  currentYear = new Date().getFullYear();
  loading: boolean = false;

  testerr: boolean = false;
  messageerr = '';

  constructor(
   private router: Router,
    private loginService: LoginService,
    private sessionMan: SessionManagerService,
   // private messageService: MessageService,
   /* private resetService: ResetService*/
  ) {}

  getErrorMessage() {
    if (this.control.hasError('required')) {
      this.messageerr = 'You must enter a value';
      this.testerr = true;
    }

    if (this.control.hasError('email')) {
      this.messageerr = 'Not a valid email';
      this.testerr = true;
    }
  }

  load() {
    this.loading = true;
    console.log(this.email, this.password);
    this.loginService.loginUser(this.email, this.password).subscribe({
      next: (resp) => {
        console.log(resp);

        this.sessionMan.saveAccessToken(resp.token);
        this.sessionMan.saveRefresh(resp.refresh);
        const { id, role, code , changPwd} = this.sessionMan.getData();
        const userDetails = new UserDetails(id, role, code , changPwd);
        this.sessionMan.authenticateUser(userDetails);
        console.log(this.sessionMan.getData().code);
        this.loading = false;
        switch (userDetails.role) {
          case 'ADMIN': {
            this.redirectTo(['./admin']);
            break;
          }
          case 'COMPANY': {
            if (resp.changePassword === 0) {
              this.redirectTo(['./check-pwd']);
          } else {
              this.redirectTo(['./company']);
          }
            break;
          }
          case 'EMPLOYEE': {
            if (resp.changePassword === 0) {
              this.redirectTo(['./check-pwd']);
          } else {
              this.redirectTo(['./employee']);
          }            break;
          }

          default:
            break;
        }
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email or password is incorrect!",
        });

        this.loading = false;
      },
    });
  }

  redirectTo(route: [string]) {
    setTimeout(() => {
      this.router.navigate(route);
    }, 1000);
  }

  clearMessages() {
    //this.msgs1 = [];
  }

  ngOnInit(): void {


  }







}
