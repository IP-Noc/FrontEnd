import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';

@Component({
  selector: 'app-check-pwd',
  templateUrl: './checkpwd.component.html',
  styleUrls: ['./checkpwd.component.css'],
})
export class CheckpwdComponent implements OnInit {
  currentYear = new Date().getFullYear();
  email=""
  password=""
  cpassword=""
  test!:boolean
  msj=""
role!:any
dataUser:any=[]
  constructor(
    private sessionMan: SessionManagerService,
    private router: Router,
    private sr: UserService,

  ) {}

  getInfoUser(id: any) {
    this.sr.getUserById(id).subscribe({
      next: (res) => {
        this.dataUser = res;
       this.email=this.dataUser.email
      },
    });
  }

  changePass()
  {
    if(this.password==this.cpassword)
    {
      let data:any={
        "email":this.email,
        "password":this.password

      }

      let data1:any={
        "email":this.email
      }
      this.sr.changePassword(data).subscribe({
        next: (res) => {
         console.log(res)
         this.test=true
         this.msj="password changed"
    }
    });

    if(this.role=='COMPANY'){
    this.sr.activateUser(data1).subscribe(
      (res) => {
        this.test=true
        this.logout()}
    )}else if(this.role=='EMPLOYEE'){
      this.sr.activateUser(data1).subscribe((res)=>{
        this.test=true
        this.logout()
      })
    }

    }
    else
    {
      this.test=false
      this.msj="passwords don't match"
      }
  }
  logout() {
    this.sessionMan.disconnectSession();
    setTimeout(() => {
      this.router.navigate(['./login']);
    }, 1000);
  }


  ngOnInit(): void {
    this.getInfoUser(this.sessionMan.getUserDetails()?.id);
this.role=this.sessionMan.getUserDetails()?.role
console.log(this.role)
  }
}
