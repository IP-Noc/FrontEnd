import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ResetService } from 'src/app/services/auth/reset.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit{

  email = ""
  msj = ""
  status!:boolean;
  code=""
  remainingTime!: number;
  currentYear = new Date().getFullYear();

constructor(private sr: ResetService, private router:Router) { }


res:boolean=false;

resendCode()
{
  let data:any={
    "email":localStorage.getItem('email')}
    this.sr.resendCode(data).subscribe(
      (data:any)=>{
        this.status=true;
        this.msj=data.message;
        console.log(data);
      }
      ,
      (error:any)=>{
        this.status=false;
        this.msj=error.message;
      }
    )
}


targetDate:any
getExpireCodedAt()
{
  let data:any={
    "email":localStorage.getItem('email')}
    this.sr.getExpireCodedAt(data).subscribe((res: any) => {
      console.log(res);
      this.targetDate = new Date(res.expiredAt);
      this.remainingTime = this.targetDate.getTime() - new Date().getTime();
      console.log(this.remainingTime);
      //make a downcount timer dynamic
      setInterval(() => {
        this.remainingTime -= 1000;
        if (this.remainingTime <= 0) {
          this.res=true;
        }
      }, 1000);
    });

}
checkCode(){
let data:any={
  "email":localStorage.getItem('email'),
  "code":this.code,
}
this.sr.checkcode(data).subscribe(
  (data:any)=>{
    this.status=true;
    this.msj=data.message;
    console.log(data);
    const navigationExtras: NavigationExtras = {
      state: {
        code: this.code // set the code inside the state
      }
    };
    this.router.navigate(['/changePassword'], navigationExtras);  }
  ,
  (error:any)=>{
    this.status=false;
    this.msj=error.message;
  }
)
}
ngOnInit(): void {

this.getExpireCodedAt();
}
}
