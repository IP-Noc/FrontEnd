import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionManagerService } from '../session/session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class GraphGrafanaService {

  constructor(private http:HttpClient,

    private sessionManagerService: SessionManagerService

  ) { }

  getGrafanaById(id:any):Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/graph/` +id)
  }

  UpdateGrafanaById(id:any, idCompany:any,data:any):Observable<any>{
    return this.http.put<any>(`${environment.BASE_URL}/graph/updateGrafanaDataById/` +id+`/${idCompany}`, data)
  }

  DeleteGrafanaById(id:any):Observable<any>{
    return this.http.delete<any>(`${environment.BASE_URL}/graph/` +id)
  }

  deleteMonitor(id:any):Observable<any>{
    return this.http.delete<any>(`${environment.BASE_URL}/monitor/` +id)
  }
}
