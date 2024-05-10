import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionManagerService } from '../session/session-manager.service';
import { throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrafanaService {

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


  VerifyGrafanaUser(id:any){
    return this.http.post(`${environment.BASE_URL}/grafana/getGrafanaByCompany`,id,{ headers: this.headersWithToken }
    ).pipe(
      catchError(this.handleError)
    );
  }

  addGrafanaUser(data:any){
    return this.http.post(`${environment.BASE_URL}/grafana/auth`,data,{ headers: this.headersWithToken }
    ).pipe(
      catchError(this.handleError)
    );
  }
}
