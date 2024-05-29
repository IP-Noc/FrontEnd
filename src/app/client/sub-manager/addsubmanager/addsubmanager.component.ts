import { Component } from '@angular/core';
import { Alert } from 'src/app/model/Alerts/Alert';
import { CompanyService } from 'src/app/services/company/company.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';

@Component({
  selector: 'app-addsubmanager',
  templateUrl: './addsubmanager.component.html',
  styleUrls: ['./addsubmanager.component.css']
})
export class AddsubmanagerComponent {
username: any;
firstname: any;
lastname: any;
phone: any;
email: any;
msjerror="";

loading = false;

alert:Alert[]=[]
constructor(private cs: CompanyService, private sessionMan: SessionManagerService) { }

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
addManager() {
console.log("clicked");

  this.loading = true;
  if (!this.email || !this.phone || !this.username || !this.firstname || !this.lastname) {
    this.msjerror="Please fill all the fields";
    this.alert.push({type:"danger",message:this.msjerror});

    this.loading = false; // Set loading to false

    return;
  }

  const phoneRegex = /^\d+$/;
  if (!phoneRegex.test(this.phone)) {
    this.msjerror="Invalid phone number";
    this.alert.push({type:"danger",message:this.msjerror});

    this.loading = false; // Set loading to false

    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    this.msjerror="Invalid email";
    this.alert.push({type:"danger",message:this.msjerror});

    this.loading = false; // Set loading to false

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
this.cs.addSubManager(data).subscribe(
  (data: any) => {
    console.log(data);
    this.msjerror="Manager added successfully";
    this.alert.push({type:"success",message:this.msjerror});
    this.loading = false;
  },
  (error: any) => {
    this.msjerror="Error while adding manager";
    this.alert.push({type:"danger",message:this.msjerror});
    this.loading = false;
  }
).add(() => {
  this.loading = false;
});
}

}
