import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { combineLatest, filter } from 'rxjs';
import { ResetService } from 'src/app/services/auth/reset.service';

@Component({
  selector: 'app-changepwdreq',
  templateUrl: './changepwdreq.component.html',
  styleUrls: ['./changepwdreq.component.css']
})
export class ChangepwdreqComponent implements OnInit,AfterViewInit{
  code: string  = "";
  password!:String;
  cpassword!:String;
  msj = ""
  status!:boolean;
  constructor( private sr:ResetService,private router:Router,private route: ActivatedRoute) { }

  currentYear = new Date().getFullYear();
statusCode!:boolean;

  save(){


    if(this.password==this.cpassword){
      let data:any={
        "email":localStorage.getItem('email'),
        "password":this.password,
      }
      this.sr.changePassword(data).subscribe(
        (data:any)=>{
          this.status=true;
          this.msj=data.message;
          console.log(data);
          this.router.navigate(['/login'])
        }
        ,
        (error:any)=>{
          this.status=false;
          this.msj=error.message;
        }
      )}
      else{
        this.status=false;
        this.msj="Passwords don't match";
      }
    }


    checkCode(): void {
      let data = {
        email: localStorage.getItem('email'),
        code: this.code,
      };
      this.sr.checkcode(data).subscribe(
        (data) => {
          this.statusCode = true;
        },
        (error) => {
          this.statusCode = false;
       //   this.router.navigate(['/login']); // Redirect on error
        }
      );
    }

    getcode() {
      try {
        const routeState = this.router.getCurrentNavigation()?.extras.state as { code: string };

        if (routeState && routeState.code) {
          this.code = routeState.code;
          console.log(this.code);
        } else {
          throw new Error('No code present in the current state');
        }
      } catch (error) {
        console.error(error);
      }

    }



ngOnInit(): void {
  this.getcode();
  this.router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe(() => this.getcode());}

ngAfterViewInit() {
  this.getcode();
}

}
