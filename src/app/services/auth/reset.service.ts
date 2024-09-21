import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import HTTP_OPTIONS from '../HTTP_OPTIONS';

@Injectable({
  providedIn: 'root',
})
export class ResetService {
  constructor(private http: HttpClient) {}

  /**
   * Sends a password reset request to the server with the user's email.
   * @param email The email address of the user requesting the password reset.
   * @returns An observable containing the server's response.
   */
  resetPassword(email: any) {
    return this.http.post(
      `${environment.BASE_URL}/auth/forgetPasswordReq`,
      email,
      HTTP_OPTIONS
    );
  }

  /**
   * Sends the verification code to the server for validation.
   * @param data The data containing the verification code.
   * @returns An observable containing the server's response.
   */
  checkcode(data: any) {
    return this.http.post(
      `${environment.BASE_URL}/auth/VerifyCode`,
      data,
      HTTP_OPTIONS
    );
  }

  /**
   * Sends a new password to the server to change the user's password.
   * @param password The new password.
   * @returns An observable containing the server's response.
   */
  changePassword(password: any) {
    return this.http.post(
      `${environment.BASE_URL}/auth/forgetPassword`,
      password,
      HTTP_OPTIONS
    );
  }

  /**
   * Resends the verification code to the user's email.
   * @param email The email address of the user.
   * @returns An observable containing the server's response.
   */
  resendCode(email: any) {
    return this.http.post(
      `${environment.BASE_URL}/auth/resent-code`,
      email,
      HTTP_OPTIONS
    );
  }

  /**
   * Gets the expiration time of the verification code from the server.
   * @param email The email address of the user.
   * @returns An observable containing the server's response.
   */
  getExpireCodedAt(email: any) {
    return this.http.post(
      `${environment.BASE_URL}/auth/getExpireCodedAt`,
      email,
      HTTP_OPTIONS
    );
  }

  /**
   * Changes the user's password using a PUT request.
   * @param password The new password.
   * @returns An observable containing the server's response.
   */
  changepassword2(password: any) {
    return this.http.put(
      `${environment.BASE_URL}/auth/resetPassword`,
      password,
      HTTP_OPTIONS
    );
  }
}
