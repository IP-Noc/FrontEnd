import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
    return this.http.get(`${environment.BASE_URL}/company/employees/${this.sessionManagerService.getUserDetails()?.company}`,{ headers: this.headersWithToken });
  }

  //Add Sub Manager
  addSubManager(data:any){
    return this.http.post(`${environment.BASE_URL}/company/add-Manager`,data,{ headers: this.headersWithToken });
  }

  //Get Sub Managers
  getSubManagers(){
    return this.http.get(`${environment.BASE_URL}/company/getManagerByCompany/${this.sessionManagerService.getUserDetails()?.company}`,{ headers: this.headersWithToken });
  }

  //Add Noc Room
  addNocRoom(data:any){
    return this.http.post(`${environment.BASE_URL}/NOC/Create-NOC-ROOM/${this.sessionManagerService.getUserDetails()?.company}`,data,{ headers: this.headersWithToken });
  }

  //update noc room
  updateNocRoom(id:any,data:any){
    return this.http.put(`${environment.BASE_URL}/NOC/updateNocRoom/${id}`,data,{ headers: this.headersWithToken });
  }

  //getAllnocRoomsbyCompany

  getAllnocRoomsbyCompany(){
    return this.http.get(`${environment.BASE_URL}/NOC/getAllNOCroomsByManager/${this.sessionManagerService.getUserDetails()?.company}`,{ headers: this.headersWithToken });
  }

  //get noc room by id
  getNocRoomById(id:any){
    return this.http.get(`${environment.BASE_URL}/NOC/${id}`,{ headers: this.headersWithToken });
  }

  getMonitorsById(id:any){
    return this.http.get(`${environment.BASE_URL}/monitor/${id}`,{ headers: this.headersWithToken });

  }

  updateMonitor(monitorId: number, monitorData: any): Observable<any> {
    return this.http.put(`/api/monitors/${monitorId}`, monitorData);
  }
  
  addMonitor(monitorData: any): Observable<any> {
    return this.http.post('/api/monitors', monitorData);
  }
  
}
