import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Item } from '../../../model/Item';
import UserModel from 'src/app/model/UserModel';
import { CompanyService } from 'src/app/services/company/company.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Alert } from 'src/app/model/Alerts/Alert';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';
import { GrafanaService } from 'src/app/services/grafana/grafana.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipe } from 'ng2-search-filter';

@Component({
  selector: 'app-addnoc',
  templateUrl: './addnoc.component.html',
  styleUrls: ['./addnoc.component.css'],
})
export class AddnocComponent implements OnInit {
  @ViewChild('apiLinkInput') apiLinkInput!: ElementRef;

  displaybuttpnGrafana: boolean = false;
  nextId = 1;
  nextUser = 0;
  searchQuery: any;
  searchText = '';
  Services: any[] = [
    { name: 'Select a service', indice: 0, status: true },
    { name: 'Grafana', indice: 1 },
    { name: 'Ekara', indice: 2 ,status: true },
  ];

  selectedIndice: number = this.Services[0].indice;
  nocroomname = '';

  
  msjerror = '';

  alert: Alert[] = [];
  users: UserModel[] = [];
  filteredUsers: UserModel[] = [];
  selectedUsers: any[] = [];

  constructor(
    private cs: CompanyService,
    private sockS: SocketService,
    private sesM: SessionManagerService,
    private gs: GrafanaService,
    public dialog: MatDialog
  ) {}
  items: Item[] = [
    {
      type: 'add',
      id: 0,
      number: 1,
      apiLink: '',
      nameSource: '',
    },
  ];

  onCheckboxChange(event: Event, user: any): void {
    // Using the 'as' keyword to assert the type of the event target
    const input = event.target as HTMLInputElement;
    user.selected = input.checked;
    event.stopPropagation();  // Stop propagation here
  }
  
  getLink() {
    this.gs.currentMessage.subscribe((message) => {
      // Example URL
      const url = message;
      const parts = url.split("/");
  
      // Assuming the format is consistent and the position part is between two dynamic segments
      const positionSegmentIndex = 6; // Adjusted if necessary based on consistent observation of URL format
      const positionSegment = parts[positionSegmentIndex];
      console.log('Position Segment:', positionSegment);
  
      // Loop through the items and check if the extracted segment matches the id
      this.items.forEach((item) => {
        if (item.id.toString() === positionSegment) {
          if(item.type === 'content') {
            item.apiLink = url;
            console.log('Updated Item:', item);
          }
        }
      });
  
      console.log('Updated Items:', this.items);
    });
  }
  ngOnInit() {
    this.filteredUsers = this.users;
    this.getEmployers();
    this.getLink();
//set the api link of the Item to this.gs.
  }
  logGrafana!: boolean;
  loading!: boolean;

  onChartSelected(indice: number): void {
    this.loading = true; // Set loading to true when the method is triggered
    if (indice == 1) {
      this.gs.VerifyGrafanaUser(this.sesM.getData().id).subscribe(
        (res: any) => {
          console.log(res);
          // API call successful, set loading back to false
          this.loading = false;
          this.displaybuttpnGrafana = true;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.openDialog();
          this.alert.push({
            type: 'danger',
            message: 'Grafana is not configured for this company',
          });
          this.loading = false; // API call failed, set loading back to false
          return of();
        }
      );
    }
  }

  addNewItem(index: number) {
    const newNumber =
      this.items.filter((item) => item.type === 'content').length + 1;
    this.items[index] = {
      type: 'content',
      id: this.nextId++,
      number: newNumber,
      active: true,
      apiLink: '',
      nameSource: '',
    };
    this.items = this.items.filter((item) => item.type === 'content');
    this.items.push({
      type: 'add',
      id: 0,
      number: newNumber + 1,
      apiLink: '',
      nameSource: '',
    });
  }

  nextStep() {
    console.log('clicked');
    console.log(this.nextUser);
    this.nextUser = 1;
  }
  backStep() {
    console.log('clicked');
    console.log(this.nextUser);
    this.nextUser = 0;
  }

  close(alert: Alert) {
    this.alert.splice(this.alert.indexOf(alert), 1);
  }

  save() {
    const selectedUsers = this.filteredUsers.filter((user) => user.selected)??[];
    let dataitems: any[] = [];

    this.items.forEach((item) => {
      if (item.type === 'content') {
        dataitems.push({
          URL: item.apiLink,
         
        });
      }
    });

    let data = {
      name: this.nocroomname,
      creator: this.sesM.getData().id,
      monitors: dataitems,
      users: selectedUsers.map((user) => user?._id),
      isHidden: false,
    };

    this.cs.addNocRoom(data).subscribe((res: any) => {
      console.log(res);
      this.msjerror = 'Noc Room added successfully';
      this.alert.push({ type: 'success', message: this.msjerror });
    });
  }

  deleteItem(itemId: number) {
    const item = this.items.find((item) => item.id === itemId);
    if (item) {
      item.active = false;
      this.items = this.items.filter((item) => item.id !== itemId);
      this.items
        .filter((item) => item.type === 'content')
        .forEach((item, index) => (item.number = index + 1));
    }
  }

  getEmployers() {
    this.cs.getEmployers().subscribe((res: any) => {
      this.filteredUsers = res.data;
      console.log('Users:', this.filteredUsers);
    });
  }
  selectUser(user: any) {
    user.selected = !user.selected;
  
    if (user.selected) {
      if (!this.selectedUsers.includes(user)) {
        this.selectedUsers.push(user);
      }
    } else {
      this.selectedUsers = this.selectedUsers.filter(
        (selectedUser) => selectedUser !== user
      );
    }
  
    console.log('Selected Users:', this.selectedUsers);
  }
  
  openGrafanaConfig(id: any) {
    const dialogRef = this.dialog.open(GrafanaConfiguration, {
      data: { id: id },
      width: '900px', // Customize the size as needed
      height: 'auto', // 'auto' size will adjust the height based on the content
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['addnoc.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class DialogContentExampleDialog {
  accountToken!: String;
  domainLink!: String;
  success!: boolean;
  loading!: boolean;
  msjStus!: string;
  constructor(
    private cs: CompanyService,
    private sesM: SessionManagerService,
    private gs: GrafanaService
  ) {}

  addGrafanaUser() {
    this.loading = true; // Start loading
    const company = this.sesM.getData().id;
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
}

interface Variable {
  variable: string;
  type: 'string' | 'date';
}

interface Target {
  refId: string;
  datasource: string;
  format: string;
  query: string;
  extractedVariables: Variable[];
}
@Component({
  selector: 'dialog-content-grafana-dialog',
  templateUrl: 'grafana.html',
  styleUrls: ['addnoc.component.css'],

})
export class GrafanaConfiguration implements OnInit {
  @Output() urlGenerated = new EventEmitter<{ index: number, url: string }>();


  dataT: any = [];
  dataTUid: any = [];
  nextUid: boolean = false;
  searchText = "";
  searchTextuid = "";
  loading!: boolean;

  variableForm: FormGroup = new FormGroup({}); // Initialize empty form group


  idPosition:any;

//get the config of the modal from the openDialog



  dataTargets: Target[] = [];  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gs: GrafanaService,
    private sessionManagerService:SessionManagerService
  ) {
    console.log(
      'Data passed to the dialog:',
//get the data from the configDialog

      this.idPosition=data.id

    ); // Now you can use the passed id or any other passed data
   
  }

  ngOnInit(): void {
    this.alldash();
    this.variableForm = new FormGroup({});
  }
  selectedStates = this.dataT;

  onKey(value: string) {
    this.selectedStates = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.dataT.filter((option: string) =>
      option.toLowerCase().startsWith(filter)
    );
  }

  alldash() {
    this.gs.getDashboards().subscribe((res: any) => {
      console.log(res);
      this.dataT = res;
    });
  }
getTemplating:any=[]
  getDashboradUid(id: any) {
    this.gs.getDashbordUid(id).subscribe((res: any) => {
     // console.log(res);
      this.dataTUid = res.panels;
      this.getTemplating=res.templatingQueries
      console.log(this.dataTUid);
      console.log(this.getTemplating);
      this.nextUid = true;
      // Reset the form with new fields
      //loop panels to get the target and it extractedValues
  
    });
  }
  formatVariableName(variableName: string): string {
    return variableName.replace('$','');
  }
  dropdownVariables: { [key: string]: any[] } = {};

  getTargets(data: any) {
    if (data && Array.isArray(data)) {
      this.dataTargets = data;
      this.variableForm = new FormGroup({});
      // Assuming data is an array of targets, each with an array of extracted variables
      this.dataTargets.forEach((target: Target) => {
        console.log('Target:', target);
        target.extractedVariables.forEach((variable: Variable) => {
          // Normalize variable name by removing special characters like '$', '{', and '}'
          const normalizedVariableName = variable.variable.replace(/[${}]/g, '');
          console.log('Normalized Variable:', normalizedVariableName);
          this.variableForm.addControl(normalizedVariableName, new FormControl(''));

          // Loop through the getTemplating and check if name exists in the extractedVariables
          this.getTemplating.forEach((element: any) => {
            console.log('Element:', element.name);
            console.log('Variable:', normalizedVariableName);
  
            // Check if the name in the getTemplating matches the normalized variable name
            if (element.name === normalizedVariableName) {
              console.log('Matched:', element);
              const currentPanel = this.dataTargetSelected.targets;
              console.log('Selected current Panel:', currentPanel);
              this.selectedPanel=this.dataTargetSelected.type
              console.log('selected Panel:', this.selectedPanel);
              if (currentPanel && currentPanel.length > 0) {
                const target2 = currentPanel[0];
                console.log("Selected Target:", target);
                
             let info :any ={
              "Company": this.sessionManagerService.getData().id,
              "datasourceUid": target2.datasource,
              "query": element.query
             }
             console.log('Info:', info);
             this.gs.ExecuteQueryByDashboard(info).subscribe((res: any) => {
              console.log('Query Response:', res);

              // Add the extracted variables to the dropdown
              const extractedValues = res;
              console.log('Extracted Values:', extractedValues);
              this.dropdownVariables[normalizedVariableName] = extractedValues;
              console.log('Dropdown Variables:', this.dropdownVariables);
              

             })
            }}
          });
  
          // Add a form control for each variable
        });
      });
    } else {
      console.error('Unexpected data structure:', data);
    }
  }
  
  
getFieldType(variableName: string): string {
  return variableName.includes('time') ? 'date' : 'text';
}
selectedTarget: any = {
  query: '',
  datasource: '',
  format: '',
  refId: '',
  extractedVariables: []
};
selectTarget(panel:any) {
    console.log('Selected Target:', this.selectedTarget);

  return this.selectedTarget = panel; // Assuming 'panel' has all required properties
}
dataTargetSelected:any=[]
selectedPanelIndex:any
selectedPanel:any
typeData:any

idGraphGrafana:any

onSubmit() {
  // Extract values from the form
  const formValues = this.variableForm.value;
  console.log('Form Values:', formValues);

  // Convert date variables dynamically and keep track of time variables
  const variables: { [key: string]: any } = {};
  let fromMillis:any;
  let toMillis:any; // Variables to hold millisecond values

  Object.keys(formValues).forEach(key => {
    // Convert date fields and add them with specific keys
    if (this.getFieldType(key) === 'date') {
      const date = new Date(formValues[key]);
      const formattedKey = this.formatVariableName(key);
      const millis = date.getTime();
      if (key.includes("From")) {
        fromMillis = millis.toString();  // Capture From time in milliseconds
      } else if (key.includes("To")) {
        toMillis = millis.toString();    // Capture To time in milliseconds
      }
      variables[formattedKey] = formValues[key]; // Store the original date in ISO format
    } else {
      // Add the original value for all other fields
      variables[this.formatVariableName(key)] = formValues[key];
    }
  });

  // Get the currently selected panel
  const currentPanel = this.dataTargetSelected.targets;
  console.log('Selected current Panel:', currentPanel);
  this.selectedPanel=this.dataTargetSelected.type
  console.log('selected Panel:', this.selectedPanel);
  if (currentPanel && currentPanel.length > 0) {
    const target = currentPanel[0];
    console.log("Selected Target:", target);
    let datasour: any = {
      "Company": this.sessionManagerService.getData().id,
      "uid": target.datasource
    };
    this.gs.getDataSource(datasour).subscribe(res => {
      this.typeData = res
      let data: any = {
        "Company": this.sessionManagerService.getUserDetails()?.id,
        "datasourceType": this.typeData,
        "datasourceUid": target.datasource,
        "rawSql": target.query,
        "from": fromMillis,  // Use captured From time in milliseconds
        "to": toMillis,  
        "typegraph":   this.selectedPanel,  // Use captured To time in milliseconds
        "refId": target.refId,
        "format": target.format,
        "variables": {
          ...variables
        }
      };
  //this.selectedPanel
      console.log('Data to send:', data);

      this.gs.ExecuteQuery(data).subscribe(res => {
        console.log('Query Response:', res);
        this.idGraphGrafana = res._id;
      
        
        //get the host to construire a url
        let host = window.location.host;
        let protocol = window.location.protocol;
        this.url = protocol + '//' + host + '/graphs/showGraph/' + this.idGraphGrafana+'/'+this.idPosition+'/'+this.sessionManagerService.getData().id;
      //  this.urlGenerated.emit({ index: this.someIndex, url: this.url });

      this.gs.changeMessage(this.url)
console.log("url",this.url)
      } )
    });
  } else {
    console.error('No target data available');
  }
}
url!:any;
}
interface ConvertedDates {
  [key: string]: number | string; // Allows indexing with a string and can contain numbers or strings
}

