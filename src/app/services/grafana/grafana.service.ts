import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionManagerService } from '../session/session-manager.service';
import { throwError, catchError, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GrafanaService {
  private headersWithToken: HttpHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private sessionManagerService: SessionManagerService
  ) {
    this.initHeadersWithToken();
  }
  private initHeadersWithToken(): void {
    const token = this.sessionManagerService.getAccessToken();

    // Check if token exists before creating headers
    if (token) {
      this.headersWithToken = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    } else {
      this.headersWithToken = new HttpHeaders({
        'Content-Type': 'application/json',
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

  VerifyGrafanaUser(id: any) {
    return this.http
      .get(`${environment.BASE_URL}/grafana/getGrafanaByCompany/` + id, {
        headers: this.headersWithToken,
      })
      .pipe(catchError(this.handleError));
  }

  addGrafanaUser(data: any) {
    return this.http
      .post(`${environment.BASE_URL}/grafana/auth`, data, {
        headers: this.headersWithToken,
      })
      .pipe(catchError(this.handleError));
  }

  getDashboards(): Observable<void> {
    return this.http
      .get<void>(
        `${environment.BASE_URL}/grafana/searchdashboard/` +
          this.sessionManagerService.getData().id,
        { headers: this.headersWithToken }
      )
      .pipe(catchError(this.handleError));
  }

  getDashbordUid(uid: any): Observable<void> {
    return this.http
      .get<void>(
        `${environment.BASE_URL}/grafana/getDashboardUid/${
          this.sessionManagerService.getData().id
        }/${uid}`,
        { headers: this.headersWithToken }
      )
      .pipe(
        catchError(this.handleError.bind(this)) // Make sure to bind 'this' or use arrow function in handleError
      );
  }

  getDataSource(data: any): Observable<void> {
    return this.http
      .post<void>(`${environment.BASE_URL}/grafana/getdatasources`, data, {
        headers: this.headersWithToken,
      })
      .pipe(
        catchError(this.handleError.bind(this)) // Make sure to bind 'this' or use arrow function in handleError
      );
  }
  ExecuteQuery(data: any): Observable<any> {
    return this.http
      .post<any>(`${environment.BASE_URL}/grafana/ExecuteQuery`, data, {
        headers: this.headersWithToken,
      })
      .pipe(
        catchError(this.handleError.bind(this)) // Make sure to bind 'this' or use arrow function in handleError
      );
  }

  ExecuteQueryByDashboard(data: any): Observable<any> {
    return this.http
      .post<any>(`${environment.BASE_URL}/grafana/ExecuteQueryPanel`, data, {
        headers: this.headersWithToken,
      })
      .pipe(
        catchError(this.handleError.bind(this)) // Make sure to bind 'this' or use arrow function in handleError
      );
  }



  private messageSource = new BehaviorSubject<any>('');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
