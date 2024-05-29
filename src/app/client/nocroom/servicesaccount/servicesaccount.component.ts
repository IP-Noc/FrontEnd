import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GrafanaService } from 'src/app/services/grafana/grafana.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyService } from 'src/app/services/company/company.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-servicesaccount',
  templateUrl: './servicesaccount.component.html',
  styleUrls: ['./servicesaccount.component.css'],
})
export class ServicesaccountComponent implements OnInit {
  selectedForm: string = 'jira';
  jiraurl: any;
  jiraUsername: any;
  jiraToken: any;
  testing!: boolean;
  jiraAccount: any = [];
  jiraDataAvailable!: boolean; // Added to track if Jira account data is available
  editing: boolean = false;
  webhookconfigur!: boolean;
  accountToken!: String;
  domainLink!: String;
  success!: boolean;
  loading!: boolean;
  msjStus!: string;
  projects: any = [];
  issueType: any = [];
  afficheIssuer!: boolean;
  webhookurl: any;
  Jiraproject: any;
  IssueTypeVal: any;
  nameWebhook: any;
ProjectTypeVal: any;

  addGrafanaUser() {
    this.loading = true; // Start loading
    const company = this.sessionManager.getData().company;
    let data = {
      token: this.accountToken,
      url: this.domainLink,
      Company: company,
    };
    console.log(data);
    this.gs.addGrafanaUser(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.success = true;
        this.msjStus = 'Grafana user added successfully';
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.success = false;
        this.msjStus =
          'An error occurred while trying to connect to Grafana. <br> Please check the domain link and account token and try again.';
        this.loading = false;
      },
    });
  }
  constructor(
    private gs: GrafanaService,
    private sessionManager: SessionManagerService,
    public dialog: MatDialog,
    private cs: CompanyService
  ) {}
  editingGrafana: boolean = false; // Add this to your component properties to track editing state

  getProject() {
    this.gs.getProjects().subscribe({
      next: (res) => {
        console.log(res);
        this.projects = res.project;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  selectedProjectName!: string;

  selectProject(event: any) {
    const selectedProjectId = event.target.value;
    // Find the project object from the projects array
    const selectedProject = this.projects.find((project: { id: any; }) => project.id === selectedProjectId);
    // Store the project name
    this.selectedProjectName = selectedProject ? selectedProject.key : '';
    // Get the issues for the selected project
    this.getIssueType(selectedProjectId);
}

  getIssueType(id: any) {
    this.gs.getIssues(id).subscribe({
      next: (res) => {
        console.log(res);
        this.issueType = res.issue;
        this.afficheIssuer = true;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  registreWebhook() {
    this.loading = true;
    let data = {
      "webhook_Name": this.nameWebhook,
      "webhook_projectKey": this.selectedProjectName,
      "webhook_issue": this.IssueTypeVal,
     
    };
  
    this.gs.registrewebhook(data).subscribe({
      next: (res) => {
        console.log(res);
        this.success = true;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.success = false;
        this.loading = false;
      },
    });
  }
  openEditGrafanaForm() {
    this.editingGrafana = true; // Enable editing mode for Grafana
  }

  updateGrafana() {
    this.loading = true;

    let data = {
      Url: this.domainLink,
      Bearertoken: this.accountToken,
      Company: this.sessionManager.getData().company,
    };
    this.gs.updateGrafana(data).subscribe({
      next: (res) => {
        console.log(res);
        this.success = true;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.success = false;
        this.loading = false;
      },
    });
  }

  openGrafanaDialog() {
    this.dialog.open(DialogGrafanaDelete, {
      width: 'auto',
    });
  }
  ngOnInit(): void {
    this.getJira();
    this.VerifyGrafana();
    this.getProject();
  }
  openEditForm(): void {
    this.webhookconfigur = false;

    this.editing = true; // Enable editing mode
  }

  openDialog(): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: 'auto',
    });
  }
  deletJira() {}
  grafanaTest!: boolean;
  VerifyGrafana() {
    this.gs.VerifyGrafanaUser(this.sessionManager.getData().company).subscribe(
      (res: any) => {
        console.log(res);
        // API call successful, set loading back to false
        this.loading = false;
        this.grafanaTest = true;
        this.domainLink = res.Url;
        this.accountToken = res.Bearertoken;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.grafanaTest = false;
        this.loading = false; // API call failed, set loading back to false
        return of();
      }
    );
  }

  openWebhookConfiguration() {
    console.log('Opening webhook configuration');
    this.editing = false;
    this.webhookconfigur = true;
  }

  selectForm(form: string): void {
    this.selectedForm = form;
    if (form === 'jira') {
      this.getJira(); // Fetch Jira data when Jira tab is selected
    }
  }
  getJira() {
    this.gs.getJiraByUser().subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.jiraAccount = res;
        if (this.jiraAccount && this.jiraAccount.Url) {
          // Check if jiraAccount and Url property exist
          this.jiraDataAvailable = true;
          this.jiraurl = this.jiraAccount.Url;
          this.jiraUsername = this.jiraAccount.username;
          this.jiraToken = this.jiraAccount.token;
        } else {
          this.jiraDataAvailable = false;
        }
      },
      error: (err) => {
        console.error('Error fetching Jira data:', err);
        this.jiraDataAvailable = false;
      },
    });
  }

  saveJira() {
    this.loading = true;
    let data: any = {
      Url: this.jiraurl,
      username: this.jiraUsername,
      token: this.jiraToken,
      user: this.sessionManager.getData().company,
    };
    this.gs.saveJira(data).subscribe({
      next: (res) => {
        console.log(res);
        this.testing = true;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.testing = false;
        this.loading = false;
      },
    });
  }
  updateJira() {
    this.loading = true;
    let data: any = {
      Url: this.jiraurl,
      username: this.jiraUsername,
      token: this.jiraToken,
      user: this.sessionManager.getData().company,
    };
    this.gs.updateJira(data).subscribe({
      next: (res) => {
        console.log(res);
        this.testing = true;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.testing = false;
        this.loading = false;
      },
    });
  }
  getButtonStyle(form: string): { [key: string]: string } {
    return this.selectedForm === form
      ? { 'background-color': '#a7c6e5b4' }
      : { 'background-color': 'transparent' };
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  styleUrls: ['servicesaccount.component.css'],
  standalone: true,
})
export class DialogAnimationsExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    private gs: GrafanaService
  ) {}

  delete() {
    this.gs.deleteJiraByUser().subscribe({
      next: (res) => {
        console.log(res);
        window.location.reload();
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialoggrafanadelete',
  templateUrl: 'dialoggrafanadelete.html',
  styleUrls: ['servicesaccount.component.css'],
  standalone: true,
})
export class DialogGrafanaDelete {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    private gs: GrafanaService
  ) {}

  deleteGrafana() {
    this.gs.deleteGrafanaUser().subscribe({
      next: (res) => {
        console.log(res);
        window.location.reload();
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
