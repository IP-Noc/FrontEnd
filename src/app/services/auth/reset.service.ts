import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import HTTP_OPTIONS from '../HTTP_OPTIONS';

@Injectable({
  providedIn: 'root',
})
export class ResetService {
  constructor(private http: HttpClient) {}

  resetPassword(email: any) {
    return this.http.post(
      `${environment.BASE_URL}/auth/forgetPasswordReq`,
      email,
      HTTP_OPTIONS
    );
  }

  checkcode(data: any) {
    return this.http.post(
      `${environment.BASE_URL}/auth/VerifyCode`,
      data,
      HTTP_OPTIONS
    );
  }

  changePassword(password: any) {
    return this.http.post(
      `${environment.BASE_URL}/auth/forgetPassword`,
      password,
      HTTP_OPTIONS
    );
  }
  resendCode(email: any) {
    return this.http.post(
      `${environment.BASE_URL}/auth/resent-code`,
      email,
      HTTP_OPTIONS
    );
  }

  getExpireCodedAt(email: any) {
    return this.http.post(
      `${environment.BASE_URL}/auth/getExpireCodedAt`,
      email,
      HTTP_OPTIONS
    );
  }
}
