import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphGrafanaService {

  constructor(private http:HttpClient) { }

  getGrafanaById(id:any):Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/graph/` +id)
  }

  UpdateGrafanaById(id:any, data:any):Observable<any>{
    return this.http.put<any>(`${environment.BASE_URL}/graph/UpdateexecuteQueryById/` +id, data)
  }

  DeleteGrafanaById(id:any):Observable<any>{
    return this.http.delete<any>(`${environment.BASE_URL}/graph/` +id)
  }
}
