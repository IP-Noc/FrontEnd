import { Injectable } from '@angular/core';
import UserDetails from 'src/app/model/UserDetails';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, BehaviorSubject } from 'rxjs';
import APIResponse from 'src/app/model/APIResponse';
import { JwtHelperService } from '@auth0/angular-jwt';

const ACCESS_KEY = 'auth-key';
const USER_KEY = 'user-key';
const REFRESH_KEY = 'refresh-key';
const CODE_KEY = 'code-key'; // Add a key to store the code

@Injectable({
  providedIn: 'root',
})
export class SessionManagerService {
  private userDataSubject = new BehaviorSubject<any>(null);
  public userData$ = this.userDataSubject.asObservable();

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

  public saveCode(code: string) {
    sessionStorage.setItem(CODE_KEY, code);
  }

  public getCode() {
    return sessionStorage.getItem(CODE_KEY);
  }

  public getData() {
    const decodedToken = this.jwtHelper.decodeToken(this.getAccessToken()!);
    console.log(decodedToken);
    const id = decodedToken.id;
    const role = decodedToken.role;
    const code = this.getCode() || decodedToken.code; // Use the stored code if available
    const changPwd = decodedToken.changePassword;
    const company = decodedToken.CompanyId;
    const name = decodedToken.name;
    const isManager = decodedToken.isManager;
    const isJira = decodedToken.isJira;
    const isGrafana = decodedToken.isGrafana;
    sessionStorage.setItem('email', decodedToken.email);
    console.log(id, role, code, changPwd);
    
    const userData = { id, role, code, changPwd, company, isManager, name, isJira, isGrafana };
    this.userDataSubject.next(userData); // Emit the updated data
    
    return userData;
  }

  public updateUserData(data: any) {
    const currentData = this.userDataSubject.value;
    const updatedData = { ...currentData, ...data };
    this.userDataSubject.next(updatedData);
    sessionStorage.setItem(USER_KEY, JSON.stringify(updatedData)); // Persist updated data in session storage
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

  public logout() {
    return this.http.post(
      `${environment.BASE_URL}/auth/Logout`, this.getUserDetails()?.id
    );
  }

  public disconnectSession(): void {
    this.logout();
    window.sessionStorage.clear();
  }
}
