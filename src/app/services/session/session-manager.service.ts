
import { Injectable } from '@angular/core';
import UserDetails from 'src/app/model/UserDetails';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import APIResponse from 'src/app/model/APIResponse';
import { JwtHelperService } from '@auth0/angular-jwt';

const ACCESS_KEY = 'auth-key';
const USER_KEY = 'user-key';
const REFRESH_KEY = 'refresh-key';

@Injectable({
  providedIn: 'root',
})
export class SessionManagerService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  public saveAccessToken(token: string) {
    sessionStorage.removeItem(ACCESS_KEY);
    sessionStorage.setItem(ACCESS_KEY, token);
  }

  public getAccessToken() {
    return sessionStorage.getItem(ACCESS_KEY);
  }

  public saveRefresh(refresh: string) {
    sessionStorage.removeItem(REFRESH_KEY);
    sessionStorage.setItem(REFRESH_KEY, refresh);
  }

  public getRefresh() {
    return sessionStorage.getItem(REFRESH_KEY);
  }
  public getData() {
    const decodedToken=this.jwtHelper.decodeToken(this.getAccessToken()!);
    console.log(decodedToken);
    const id = decodedToken.id;
    const role = decodedToken.role;
    const code = decodedToken.code;
    const changPwd = decodedToken.changPwd;

    return { id, role ,code ,changPwd};
  }

  public authenticateUser(user: UserDetails) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserDetails(): UserDetails | null {
    const userSession = sessionStorage.getItem(USER_KEY);
    if (!userSession) return null;
    return JSON.parse(userSession);
  }

  public isLoggedIn() {
    return sessionStorage.getItem(USER_KEY) != null;
  }

  public clean(userId: string): Observable<APIResponse> {
    return this.http.delete<APIResponse>(
      `${environment.BASE_URL}/student/del-code/${userId}`
    );
  }

  public logout()
  {
    return this.http.post(
      `${environment.BASE_URL}/auth/Logout`,this.getUserDetails()?.id
    )
  }
  public disconnectSession(): void {
    this.logout();

    window.sessionStorage.clear();
  }
}
