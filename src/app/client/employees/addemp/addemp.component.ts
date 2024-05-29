import { Component } from '@angular/core';
import { Alert } from 'src/app/model/Alerts/Alert';
import { CompanyService } from 'src/app/services/company/company.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';

@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css']
})
export class AddempComponent {
  email!: string ;
  phone!: string ;
  username!: string ;
  firstname!: string ;
  lastname!: string ;
msjerror="";
loading = false;

alert:Alert[]=[]
  constructor(private cs: CompanyService, private sessionMan: SessionManagerService) { }

  addEmp() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    if (!this.email || !this.phone || !this.username || !this.firstname || !this.lastname) {
      this.msjerror="Please fill all the fields";
      return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(this.phone)) {
      this.msjerror="Invalid phone number";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.msjerror="Invalid email";
      return;
    }

    let data: any = {
      email: this.email,
      phone: this.phone,
      username: this.username,
      firstName: this.firstname,
      lastName: this.lastname,
      CompanyID: this.sessionMan.getUserDetails()!.company
    }

    this.cs.addEmployer(data).subscribe(
      (data: any) => {
        console.log(data);
        this.msjerror="Employee added successfully";
        this.alert.push({type:"success",message:this.msjerror});
      },
      (error: any) => {
        console.log(error);
        this.msjerror="Error while adding employee";
        this.alert.push({type:"danger",message:this.msjerror});
      }
    ).add(() => {
      this.loading = false;
    });
  }
	close(alert: Alert) {
		this.alert.splice(this.alert.indexOf(alert), 1);
    this.resetForm()
	}

  //reset the form
  resetForm() {
    this.email = "";
    this.phone = "";
    this.username = "";
    this.firstname = "";
    this.lastname = "";
  }
}
