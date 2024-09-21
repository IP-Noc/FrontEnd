import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResetService } from 'src/app/services/auth/reset.service';

/**
 * Component for handling password reset requests.
 */
@Component({
  selector: 'app-reqreset',
  templateUrl: './reqreset.component.html',
  styleUrls: ['./reqreset.component.css']
})
export class ReqresetComponent implements OnInit {
  /** Current year for display purposes */
  currentYear = new Date().getFullYear();

  /** User's email */
  email = '';
  /** Message to display the status of the reset request */
  msj = '';
  /** Status of the reset request (true for success, false for failure) */
  status!: boolean;

  /**
   * Constructor to inject necessary services.
   * @param sr - The ResetService to handle password reset requests.
   * @param router - The Router for navigation.
   */
  constructor(private sr: ResetService, private router: Router) { }

  /**
   * Sends a password reset code to the user's email.
   * If successful, sets the status to true and navigates to the login page.
   * If an error occurs, sets the status to false and displays an error message.
   */
  SendCode() {
    const data = {
      email: this.email
    };

    this.sr.changepassword2(data).subscribe(
      (response: any) => {
        this.status = true;
        this.msj = response.message;
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.status = false;
        this.msj = error.message;
      }
    );
    console.log(data);
  }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {}
}
