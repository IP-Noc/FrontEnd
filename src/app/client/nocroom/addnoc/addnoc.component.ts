import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../../model/Item';
import UserModel from 'src/app/model/UserModel';
import { CompanyService } from 'src/app/services/company/company.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Alert } from 'src/app/model/Alerts/Alert';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';
import { GrafanaService } from 'src/app/services/grafana/grafana.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-addnoc',
  templateUrl: './addnoc.component.html',
  styleUrls: ['./addnoc.component.css']
})
export class AddnocComponent implements OnInit {
  @ViewChild('apiLinkInput') apiLinkInput!: ElementRef;

  nextId = 1;
  nextUser = 0;
  searchQuery: any;
  searchText = "";
  Services: any[] = [
    { name: 'Select a service', indice: 0, status: true },
    { name: 'Grafana', indice: 1 },
    { name: 'Ekara', indice: 2 }
  ];

  selectedIndice: number = this.Services[0].indice;
  nocroomname = "";

  items: Item[] = [{ type: 'add', id: 0, number: 1, apiLink: '', selectedChart: '', nameSource: '' }];
  msjerror = "";

  alert: Alert[] = [];
  users: UserModel[] = [];
  filteredUsers: UserModel[] = [];
  selectedUsers: any[] = [];

  constructor(private cs: CompanyService, private sockS: SocketService,
    private sesM: SessionManagerService, private gs: GrafanaService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.filteredUsers = this.users;
    this.getEmployers();
  }
logGrafana:boolean=false;
loading: boolean = false;

onChartSelected(indice: number): void {
  this.loading = true; // Set loading to true when the method is triggered
  if (indice == 1) {
    this.gs.VerifyGrafanaUser(this.sesM.getData().company).subscribe(
      (res: any) => {
        console.log(res);
        // API call successful, set loading back to false
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.openDialog();
        this.alert.push({ type: "danger", message: "Grafana is not configured for this company" });
        this.loading = false; // API call failed, set loading back to false
        return of();
      }
    );
  }
}

  

  addNewItem(index: number) {
    const newNumber = this.items.filter(item => item.type === 'content').length + 1;
    this.items[index] = { type: 'content', id: this.nextId++, number: newNumber, active: true, apiLink: '', selectedChart: '', nameSource: '' };
    this.items = this.items.filter(item => item.type === 'content');
    this.items.push({
      type: 'add', id: 0, number: newNumber + 1,
      apiLink: '',
      selectedChart: '',
      nameSource: ''
    });
  }

  nextStep() {
    console.log("clicked");
    console.log(this.nextUser);
    this.nextUser = 1;
  }

  close(alert: Alert) {
    this.alert.splice(this.alert.indexOf(alert), 1);
  }

  save() {
    const selectedUsers = this.filteredUsers.filter(user => user.selected);
    let dataitems: any[] = [];

    this.items.forEach(item => {
      if (item.type === 'content') {
        dataitems.push({
          URL: item.apiLink,
          template: item.selectedChart,
          source: item.nameSource,
          positionInTemplate: item.number
        });
      }
    });

    let data = {
      name: this.nocroomname,
      creator: this.sesM.getData().id,
      monitors: dataitems,
      users: selectedUsers.map(user => user._id),
      isHidden: false
    };

    this.cs.addNocRoom(data).subscribe((res: any) => {
      console.log(res);
      this.msjerror = "Noc Room added successfully";
      this.alert.push({ type: "success", message: this.msjerror });
    });
  }

  deleteItem(itemId: number) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.active = false;
      this.items = this.items.filter(item => item.id !== itemId);
      this.items.filter(item => item.type === 'content').forEach((item, index) => item.number = index + 1);
    }
  }

  getEmployers() {
    this.cs.getEmployers().subscribe((res: any) => {
      this.filteredUsers = res;
    });
  }

  selectUser(user: any) {
    user.selected = !user.selected;

    if (user.selected) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser !== user);
    }

    console.log('Selected Users:', this.selectedUsers);
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  }




@Component({
selector: 'dialog-content-example-dialog',
templateUrl: 'dialog.html',
styleUrls:['addnoc.component.css'],
standalone: true,
imports: [MatDialogModule, MatButtonModule,MatFormFieldModule, MatInputModule,FormsModule,CommonModule],
})
export class DialogContentExampleDialog {
  accountToken = '';
  domainLink = '';
success:boolean=false;

  constructor(private cs: CompanyService, private sesM: SessionManagerService , private gs :GrafanaService) { }

  addGrafanaUser() {
    let data:any={
      "token":this.accountToken,
      "url":this.domainLink,
      "Company":this.sesM.getData().id
    }
    this.gs.addGrafanaUser(data).subscribe((res: any) => {
      console.log(res);
      this.success=true;
    });
  }
}