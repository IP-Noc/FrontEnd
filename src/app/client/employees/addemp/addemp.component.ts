import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/model/Alerts/Alert';
import { CompanyService } from 'src/app/services/company/company.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';
import * as Papa from 'papaparse';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css']
})
export class AddempComponent {
  email!: string;
  phone!: string;
  username!: string;
  firstname!: string;
  lastname!: string;
  msjerror = "";
  loading = false;
  alert: Alert[] = [];

  constructor(private cs: CompanyService, private sessionMan: SessionManagerService, private modalService: NgbModal) { }

  openCsvUploadModal() {
    const modalRef = this.modalService.open(CsvUploadModalComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      if (result) {
        // Handle result if needed
      }
    }, (reason) => {
      // Handle dismiss if needed
    });
  }

  addEmp() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    if (!this.email || !this.phone || !this.username || !this.firstname || !this.lastname) {
      this.msjerror = "Please fill all the fields";
      this.loading = false; // reset loading state
      return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(this.phone)) {
      this.msjerror = "Invalid phone number";
      this.loading = false; // reset loading state
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.msjerror = "Invalid email";
      this.loading = false; // reset loading state
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
        this.msjerror = "Employee added successfully";
        this.alert.push({ type: "success", message: this.msjerror });
        this.resetForm(); // reset form on success
      },
      (error: any) => {
        console.log(error);
        this.msjerror = "Error while adding employee";
        this.alert.push({ type: "danger", message: this.msjerror });
      }
    ).add(() => {
      this.loading = false;
    });
  }

  close(alert: Alert) {
    this.alert.splice(this.alert.indexOf(alert), 1);
    this.resetForm();
  }

  // Reset the form
  resetForm() {
    this.email = "";
    this.phone = "";
    this.username = "";
    this.firstname = "";
    this.lastname = "";
  }
}

@Component({
  selector: 'app-csv-upload-modal',
  templateUrl: './csv-upload-modal.component.html',
  styleUrls: ['./addemp.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CsvUploadModalComponent implements OnInit {
  public jsonData: any = [];
  public showAll: boolean = false;
  loading = false;
  msjerror!: string;
  alert: Alert[] = [];
testing!:boolean
  constructor(
    public modal: NgbActiveModal,
    private cs: CompanyService,
    private sessionMan: SessionManagerService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = reader.result as string;
      this.convertCSVToJSON(csv);
    };
    reader.readAsText(file);
  }

  convertCSVToJSON(csv: string) {
    Papa.parse(csv, {
      header: true,
      complete: (result) => {
        this.jsonData = result.data;
      }
    });
  }
  async addEmployees() {
    if (this.loading) {
      return;
    }
  
    this.loading = true;
    const companyID = this.sessionMan.getUserDetails()!.company;
  
    // To keep track of successfully added employees
    const indicesToRemove: number[] = [];
  
    for (let index = 0; index < this.jsonData.length; index++) {
      const item = this.jsonData[index];
      let data: any = {
        email: item.email,
        phone: item.phone,
        username: item.username,
        firstName: item.firstName,
        lastName: item.lastName,
        CompanyID: companyID
      };
  
      try {
        const result = await this.cs.addEmployer(data).toPromise();
        console.log(`Employee ${index + 1} added successfully`);
        this.msjerror = ` ${index + 1} employees added successfully`;
        this.alert.push({ type: "success", message: this.msjerror });
        this.testing = true;
        // Mark the index for removal
        indicesToRemove.push(index);
      } catch (error) {
        console.log(`Error while adding employee ${index + 1}`);
        this.msjerror = ` ${index + 1} employees not added successfully`;
        this.alert.push({ type: "danger", message: this.msjerror });
        this.testing = false;
      }
    }
  
    // Remove the successfully added employees from jsonData
    this.jsonData = this.jsonData.filter((_: any, index: number) => !indicesToRemove.includes(index));
  
    this.loading = false;
  
    // Redirect to listemployees after processing all items
    this.router.navigate(['/listemployees']);
  }
  

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  deleteItem(index: number) {
    this.jsonData.splice(index, 1);
  }

  showAllData() {
    this.showAll = true;
  }

  close(alert: Alert) {
    this.alert.splice(this.alert.indexOf(alert), 1);
    this.resetForm();
  }

  // Reset the form
  resetForm() {
    this.jsonData = [];
  }
}
