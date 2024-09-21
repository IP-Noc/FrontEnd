import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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
import Swal from 'sweetalert2';
import { SharedStateServiceService } from 'src/app/services/sharedservice/shared-state-service.service';

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
  jiraDataAvailable!: boolean;
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
  webhooks: any = [];
  showWebhookForm: boolean = false;
  showExistingWebhookList: boolean = false;

  constructor(
    private gs: GrafanaService,
    private sessionManager: SessionManagerService,
    public dialog: MatDialog,
    private cs: CompanyService,
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private sharedStateService: SharedStateServiceService
  ) {
    this.sharedStateService.jiraDataAvailable$.subscribe((value) => {
      this.jiraDataAvailable = value;
      this.cd.detectChanges();
    });
  }

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

  editingGrafana: boolean = false;

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
    const selectedProject = this.projects.find((project: { id: any }) => project.id === selectedProjectId);
    this.selectedProjectName = selectedProject ? selectedProject.key : '';
    this.getIssueType(selectedProjectId);
  }

  getWebhooks() {
    this.gs.getwebhook().subscribe({
      next: (res) => {
        console.log('hi', res);
        this.webhooks = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
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
      webhook_Name: this.nameWebhook,
      webhook_projectKey: this.selectedProjectName,
      webhook_issue: this.IssueTypeVal,
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
        // Refresh Grafana data
        this.refreshTokenData();
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
    this.getWebhooks();
    this.getJiradata();
  }

  getJiradata() {
    this.zone.run(() => {
      this.jiraDataAvailable = this.sessionManager.getData().isJira;
      this.sharedStateService.setJiraDataAvailable(this.jiraDataAvailable);
      this.cd.detectChanges();
    });
  }

  refreshTokenData() {
    const updatedData = this.sessionManager.getData();
    this.zone.run(() => {
      this.sharedStateService.setJiraDataAvailable(updatedData.isJira);
      this.sessionManager.updateUserData({ isJira: true }); // Use the new method to update isJira
      console.log("datajira", this.sessionManager.getData());
      this.cd.detectChanges(); // Ensure change detection is triggered
    });
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
    this.gs.VerifyGrafanaUser(this.sessionManager.getData().id).subscribe(
      (res: any) => {
        console.log(res);
        this.loading = false;
        this.grafanaTest = true;
        this.domainLink = res.Url;
        this.accountToken = res.Bearertoken;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.grafanaTest = false;
        this.loading = false;
        return of();
      }
    );
  }

  openWebhookConfiguration() {
    console.log('Opening webhook configuration');
    this.editing = false;
    this.webhookconfigur = true;
    this.showWebhookForm = false;
    this.showExistingWebhookList = false;
  }

  showAddWebhookForm() {
    this.showWebhookForm = true;
    this.showExistingWebhookList = false;
  }

  showExistingWebhooks() {
    this.showWebhookForm = false;
    this.showExistingWebhookList = true;
  }

  extractIdFromSelf(selfUrl: string): string {
    const parts = selfUrl.split('/');
    return parts[parts.length - 1];
  }

  convertTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
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
        this.jiraDataAvailable = this.jiraAccount ? true : false;
        if (this.jiraAccount && this.jiraAccount.Url) {
          this.jiraurl = this.jiraAccount.Url;
          this.jiraUsername = this.jiraAccount.username;
          this.jiraToken = this.jiraAccount.token;
        }
      },
      error: (err) => {
        console.error('Error fetching Jira data:', err);
      },
    }); 
  }

  saveJira() {
    this.loading = true;
    let data: any = {
      Url: this.jiraurl,
      username: this.jiraUsername,
      token: this.jiraToken,
      user: this.sessionManager.getData().id,
      company: this.sessionManager.getData().company,
    };
    this.gs.saveJira(data).subscribe({
      next: (res) => {
        console.log(res);
        this.testing = true;
        this.loading = false;
        this.getJiradata();
        // Refresh Jira data
        this.refreshTokenData();
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

  deleteWebhook(webhookId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this webhook!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.gs.deletewebhook(webhookId).subscribe({
          next: (res) => {
            console.log(res);
            this.getWebhooks();
            Swal.fire('Deleted!', 'Webhook has been deleted.', 'success');
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error!', 'An error occurred while deleting the webhook.', 'error');
          },
        });
      }
    });
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
    private gs: GrafanaService,
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private sessionManager: SessionManagerService,
    private sharedStateService: SharedStateServiceService
  ) {}

  delete() {
    this.gs.deleteJiraByUser().subscribe({
      next: (res) => {
        this.zone.run(() => {
          this.cd.detectChanges();
          console.log(res);
          // Refresh Jira data
          this.refreshTokenData();
          window.location.reload();
          this.dialogRef.close();
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  refreshTokenData() {
    const updatedData = this.sessionManager.getData();
    this.zone.run(() => {
      this.sharedStateService.setJiraDataAvailable(updatedData.isJira);
      this.cd.detectChanges(); // Ensure change detection is triggered
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
