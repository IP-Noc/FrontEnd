import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import APIResponse from 'src/app/model/APIResponse';
import JwtResponse from 'src/app/model/JwtResponse';
import { environment } from 'src/environments/environment.development';
import HTTP_OPTIONS from '../HTTP_OPTIONS';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public loginUser(email: string, password: string) {
    return this.http.post<JwtResponse>(
      `${environment.BASE_URL}/auth/login`,
      {
        email: email,
        password: password,
      },
      HTTP_OPTIONS
    );
  }

  public listInstitute() {
    return this.http.get(`${environment.BASE_URL}/auth/listInstitutesExterne`);
  }

  addStudent(formdata: FormData) {
    console.log(formdata);
    return this.http.post<APIResponse>(
      `${environment.BASE_URL}/auth/add-student`,
      formdata
    );
  }

  //resend code
  resendCode(email: string) {
    return this.http.post<APIResponse>(
      `${environment.BASE_URL}/auth/resend-code`,
      { email: email }
    );
  }

}
