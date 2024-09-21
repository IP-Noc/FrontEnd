import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import UserDetails from 'src/app/model/UserDetails';
import { LoginService } from 'src/app/services/auth/login.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';
import Swal from 'sweetalert2';

/**
 * Component for handling user login.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /** User's email */
  email!: string;
  /** Form control for the email input with required and email validators */
  control = new FormControl('', [Validators.required, Validators.email]);
  /** Flag to hide or show the password input */
  hide = true;
  /** User's password */
  password!: string;
  /** Current year for display purposes */
  currentYear = new Date().getFullYear();
  /** Flag to indicate if the loading spinner should be displayed */
  loading: boolean = false;

  /** Flag to indicate if there is a test error */
  testerr: boolean = false;
  /** Message to display in case of an error */
  messageerr = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private sessionMan: SessionManagerService,
  ) {}

  /**
   * Gets the appropriate error message for the email form control.
   * Sets the error message and the error flag based on the form control's validation status.
   */
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

  /**
   * Initiates the login process.
   * Sets the loading flag, calls the login service, and handles the response.
   * If successful, saves the tokens, authenticates the user, and redirects based on the user's role.
   * If an error occurs, shows an error message.
   */
  load() {
    this.loading = true;
    console.log(this.email, this.password);
    this.loginService.loginUser(this.email, this.password).subscribe({
      next: (resp) => {
        console.log(resp);

        this.sessionMan.saveAccessToken(resp.token);
        this.sessionMan.saveRefresh(resp.refresh);
        const { id, role, code, changPwd, company , name , isJira,isGrafana } = this.sessionMan.getData();
        const userDetails = new UserDetails(id, role, code, undefined, changPwd, company, name, isJira,isGrafana);
        this.sessionMan.authenticateUser(userDetails);
        console.log(this.sessionMan.getData().code);

        console.log(`aaaaaa ${changPwd}`);
        this.loading = false;
        switch (userDetails.role) {
          case 'ADMIN': {
            this.redirectTo(['./admin']);
            break;
          }
          case 'COMPANY': {
            if (changPwd === 0) {
              this.redirectTo(['./check-pwd']);
            } else {
              this.redirectTo(['./company']);
            }
            break;
          }
          case 'MANAGER': {
            if (changPwd === 0) {
              this.redirectTo(['./check-pwd']);
            } else {
              this.redirectTo(['./company']);
            }
            break;
          }
          case 'EMPLOYEE': {
            if (changPwd === 0) {
              this.redirectTo(['./check-pwd']);
            } else {
              this.redirectTo(['./employee']);
            }
            break;
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

  /**
   * Redirects the user to a specified route after a short delay.
   * @param route - The route to navigate to.
   */
  redirectTo(route: [string]) {
    setTimeout(() => {
      this.router.navigate(route);
    }, 1000);
  }

  /**
   * Clears any messages (currently commented out).
   */
  clearMessages() {
    // this.msgs1 = [];
  }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {}
}
