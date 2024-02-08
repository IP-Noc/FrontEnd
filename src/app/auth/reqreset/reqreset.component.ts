import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResetService } from 'src/app/services/auth/reset.service';

@Component({
  selector: 'app-reqreset',
  templateUrl: './reqreset.component.html',
  styleUrls: ['./reqreset.component.css']
})
export class ReqresetComponent implements OnInit{
  currentYear = new Date().getFullYear();

  email = ""
  msj = ""
  status!: boolean;
  constructor(private sr: ResetService, private router:Router) { }

  SendCode() {
      let data:any={
        "email":this.email
      }
    this.sr.resetPassword(data).subscribe(
      (data: any) => {
        this.status = true;
        this.msj = data.message;
        console.log(data);
        localStorage.setItem('email',this.email)
        this.router.navigate(['/checkCode'])

      },
      (error: any) => {
        this.status = false;
        this.msj = error.message;
      }
    )
    console.log(data)

  }

  ngOnInit(): void {
  }

}
