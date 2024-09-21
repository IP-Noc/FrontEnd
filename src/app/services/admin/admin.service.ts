import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import APIResponse from 'src/app/model/APIResponse';
import { Company } from 'src/app/model/Company';
import { environment } from 'src/environments/environment.development';
import { SessionManagerService } from '../session/session-manager.service';
import { throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
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
  AddCompany(Company: FormData) {
    console.log(Company);
    return this.http.post<APIResponse>(
      `${environment.BASE_URL}/admin/add-company`,
      Company,{ headers: this.headersWithToken }
    ).pipe(
      catchError(this.handleError)
    );
  }

  ListCompanys() {
    return this.http.get<Array<Company>>(
      `${environment.BASE_URL}/admin/list-companies`,{ headers: this.headersWithToken }
    );
  }

  AddAdmin(admin: any) {
    return this.http.post<APIResponse>(
      `${environment.BASE_URL}/admin/add-Admin`,
      admin,{ headers: this.headersWithToken }
    ).pipe(
      catchError(this.handleError)
    );
  }

  UpdateCompany(id:any,Company: any) {
    return this.http.put<APIResponse>(
      `${environment.BASE_URL}/admin/updatecompany/${id}`,
      Company,{ headers: this.headersWithToken }
    ).pipe(
      catchError(this.handleError)
    );
  }

}
