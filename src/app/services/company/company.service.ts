import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionManagerService } from '../session/session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private headersWithToken: HttpHeaders = new HttpHeaders;

  constructor(private http: HttpClient, private sessionManagerService:SessionManagerService) {
    this.initHeadersWithToken();

  }
  private initHeadersWithToken(): void {
    const token = this.sessionManagerService.getAccessToken();

    // Check if token exists before creating headers
    if (token) {
      this.headersWithToken = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
    } else {
      this.headersWithToken = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  addEmployer(data:any){
    return this.http.post(`${environment.BASE_URL}/company/add-Employee`,data,{ headers: this.headersWithToken });
  }

  getEmployers(){
    return this.http.get(`${environment.BASE_URL}/company/employees/${this.sessionManagerService.getUserDetails()?.id}`,{ headers: this.headersWithToken });
  }

  //Add Sub Manager
  addSubManager(data:any){
    return this.http.post(`${environment.BASE_URL}/company/add-Manager`,data,{ headers: this.headersWithToken });
  }

  //Get Sub Managers
  getSubManagers(){
    return this.http.get(`${environment.BASE_URL}/company/getManagerByCompany/${this.sessionManagerService.getUserDetails()?.id}`,{ headers: this.headersWithToken });
  }
}
