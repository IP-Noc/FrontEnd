import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { StepsData } from 'src/app/model/Stepdata';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //get userBy id
  getUserById(id: any) {
    return this.http.get(`${environment.BASE_URL}/user/details/${id}`);
  }

  enableuserbyid(id: any) {
    return this.http.patch(`${environment.BASE_URL}/user/enable/${id}`, id);
  }

  disableuserbyid(id: any) {
    return this.http.patch(`${environment.BASE_URL}/user/disable/${id}`, id);
  }

  getUSersCount() {
    return this.http.get(`${environment.BASE_URL}/user/getAllMethodUsers`);
  }

  countUserByCreatedAt(Year: any) {
    return this.http.get(
      `${environment.BASE_URL}/user/countUserByCreatedAt/${Year}`
    );
  }

  changePassword(data:any)
  {
    return this.http.post(
      `${environment.BASE_URL}/user/changePassword`,data
    )
  }

  activateUser(data:any)
  {
    return this.http.patch(
      `${environment.BASE_URL}/company/activate-client`,data
    )
  }



  archiveUser(id:any){
    return this.http.get(
      `${environment.BASE_URL}/user/archiveUser/${id}`
    )
  }


  getStepsByidUser(id:any)
  {
    return this.http.get(
      `${environment.BASE_URL}/stepsData/getAllStepsByUserId/${id}`
    )
  }

  getStepsByid(id:any)
  {
    return this.http.get(
      `${environment.BASE_URL}/stepsData/getStepsById/${id}`
    )
  }
}
