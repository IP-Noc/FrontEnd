import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { GrafanaService } from 'src/app/services/grafana/grafana.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';


@Component({
  selector: 'app-servicesaccount',
  templateUrl: './servicesaccount.component.html',
  styleUrls: ['./servicesaccount.component.css']
})
export class ServicesaccountComponent implements OnInit{
  selectedForm: string = 'jira';
  jiraurl: any;
  jiraUsername: any;
  jiraToken: any;
  testing!: boolean ;
  jiraAccount: any = [];
  jiraDataAvailable!: boolean ;  // Added to track if Jira account data is available
  editing: boolean = false;  
  constructor(private gs: GrafanaService, private sessionManager: SessionManagerService,public dialog: MatDialog) {}

  ngOnInit(): void {
   this.getJira()
  }
  openEditForm(): void {
    this.editing = true;  // Enable editing mode
  }

  openDialog(): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: 'auto',
    });
  }
  deletJira(){
    

  }
  selectForm(form: string): void {
    this.selectedForm = form;
    if (form === 'jira') {
      this.getJira();  // Fetch Jira data when Jira tab is selected
    }
  }
  getJira() {
    this.gs.getJiraByUser().subscribe({
      next: (res) => {
        console.log("Response:", res);
        this.jiraAccount = res;
        if (this.jiraAccount && this.jiraAccount.Url) {  // Check if jiraAccount and Url property exist
          this.jiraDataAvailable = true;
          this.jiraurl = this.jiraAccount.Url;
          this.jiraUsername = this.jiraAccount.username;
          this.jiraToken = this.jiraAccount.token;
        } else {
          this.jiraDataAvailable = false;
        }
      },
      error: (err) => {
        console.error("Error fetching Jira data:", err);
        this.jiraDataAvailable = false;
      }
    });
  }
  
  saveJira() {
    let data: any = {
      "Url": this.jiraurl,
      "username": this.jiraUsername,
      "token": this.jiraToken,
      "user": this.sessionManager.getData().id
    };
    this.gs.saveJira(data).subscribe({
      next: (res) => {
        console.log(res);
        this.testing = true;
      },
      error: (err) => {
        console.log(err);
        this.testing = false;
      }
    });
  }
  updateJira() { 
    let data: any = {
      "Url": this.jiraurl,
      "username": this.jiraUsername,
      "token": this.jiraToken,
      "user": this.sessionManager.getData().id
    };
    this.gs.updateJira(data).subscribe({
      next: (res) => {
        console.log(res);
        this.testing = true;
      },
      error: (err) => {
        console.log(err);
        this.testing = false;
      }
    });
  
  }
  getButtonStyle(form: string): { [key: string]: string } {
    return this.selectedForm === form ? {'background-color': '#a7c6e5b4'} : {'background-color': 'transparent'};
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  styleUrls: ['servicesaccount.component.css'],
  standalone: true,
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,private gs:GrafanaService) {}

  delete(){
    this.gs.deleteJiraByUser().subscribe({
      next: (res) => {
        console.log(res);
        window.location.reload();
        this.dialogRef.close();

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}