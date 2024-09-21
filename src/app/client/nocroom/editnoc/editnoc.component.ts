import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Inject, OnInit, Optional, Output, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/model/Alerts/Alert';
import { of } from 'rxjs';
import { Item } from 'src/app/model/Item';
import UserModel from 'src/app/model/UserModel';
import { CompanyService } from 'src/app/services/company/company.service';
import { GrafanaService } from 'src/app/services/grafana/grafana.service';
import { GraphGrafanaService } from 'src/app/services/graphGrafana/graph-grafana.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { GrafanaConfiguration, DialogContentExampleDialog } from '../addnoc/addnoc.component';
import { FormGroup, FormControl } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
@Component({
  selector: 'app-editnoc',
  templateUrl: './editnoc.component.html',
  styleUrls: ['./editnoc.component.css']
})
export class EditnocComponent implements OnInit{
  @ViewChild('apiLinkInput') apiLinkInput!: ElementRef;
  @ViewChild('iframe') iframe!: ElementRef;

  displaybuttpnGrafana: boolean = false;
  nextId = 1;
  idNocRoom: any;
  idMonitor:any;
  nextUser = 0;
  searchQuery: any;
  searchText = '';
  position!:any;
  Services: any[] = [
    { name: 'Select a service', indice: 0, status: true },
    { name: 'Grafana', indice: 1 },
    { name: 'Ekara', indice: 2, status: true },
  ];

  selectedIndice: number = this.Services[0].indice;
  nocroomname = '';

  msjerror = '';
id:any
  alert:  Alert[] = [];
  users: UserModel[] = [];
  filteredUsers: UserModel[] = [];
  selectedUsers: any[] = [];

  constructor(
    private cs: CompanyService,
    private sockS: SocketService,
    private sesM: SessionManagerService,
    private gs: GrafanaService,
    public dialog: MatDialog,
    private graphserv:GraphGrafanaService,
    private router: ActivatedRoute,
    private renderer: Renderer2

  ) {

    this.idNocRoom= this.router.snapshot.paramMap.get('id');
    console.log("IDNOCROOM",this.idNocRoom);
  }
  items: Item[] = [
    {
      type: 'add',
      id: 0,
      number: 1,
      apiLink: '',
      nameSource: '',
      typeSource: '',
      nameService: '',
      _idMonitor: '',
      selectedIndice: false,

    },
  ];
  nameSource2:any;
  onCheckboxChange(event: Event, user: any): void {
    // Using the 'as' keyword to assert the type of the event target
    const input = event.target as HTMLInputElement;
    const selectedIndice = +input.value;
    user.selected = input.checked;
    event.stopPropagation(); // Stop propagation here
  }
  typeChart: any;
  getType() {
    this.gs.currentMessageType.subscribe((message) => {
      this.typeChart = message;
      const displayValue = message; // Assuming 'display' is part of the message
      const displayParts = displayValue.split(' '); // Split the display message by space or another delimiter as needed
  
      // Extract numeric part from the first part of the display message
      const numericSegment = displayParts[0].match(/\d+/); // Get the first set of numbers
      if (numericSegment) {
        const numericValue = numericSegment[0]; // First matched number
  
        // Remove the numeric part from the first segment
        displayParts[0] = displayParts[0].replace(numericValue, '');
  
        // Join the parts back without the numeric part
        const updatedMessage = displayParts.join(' ').trim();
  
        // Loop through the items and update typeSource if the id matches the extracted number
        this.items.forEach((item) => {
          if (item.id.toString() === numericValue) {
            item.typeSource = updatedMessage;
            console.log('Updated Item:', item);
          }
        });
      }
  
      console.log('Updated Items:', this.items);
    });
  }
  
  idGrafana: any;
  
  getLink() {
    this.gs.currentMessage.subscribe((message) => {
      // Example URL
      const url = message;
      const parts = url.split('/');

      // Assuming the format is consistent and the position part is between two dynamic segments
      const positionSegmentIndex = 6; // Adjusted if necessary based on consistent observation of URL format
      const positionSegment = parts[positionSegmentIndex];
      console.log('Position Segment:', positionSegment);
this.idGrafana = parts[positionSegmentIndex-1];
      // Loop through the items and check if the extracted segment matches the id
      this.items.forEach((item) => {
        if (item.id.toString() === positionSegment) {
          if (item.type === 'content') {
            item.apiLink = url;
            console.log('Updated Item:', item);
            item.graphId = this.idGrafana;
          }
        }
      });

      console.log('Updated Items:', this.items);
    });
  }
    getTitle() {
    this.gs.currentMessageTilte.subscribe((message) => {
      console.log('TitleMessage:', message);
  
      // Use a regular expression to find the number inside the brackets
      const numberPattern = /\[(\d+)\]/;
      const match = message.match(numberPattern);
      const numberInsideBrackets = match ? parseInt(match[1], 10) : null;
  
      // Extract the text before the brackets
      const textPattern = /^(.+?)\[/;
      const textMatch = message.match(textPattern);
      const textBeforeBrackets = textMatch ? textMatch[1] : message;
  
      // Log the extracted values
      console.log('Number:', numberInsideBrackets);
      console.log('Text:', textBeforeBrackets);
  
      // If you need to use these elsewhere
    // Loop through the items and check if the extracted segment matches the id
    this.items.forEach((item) => {
      if (item.id.toString() === numberInsideBrackets!.toString()) {
        if (item.type === 'content') {
          this.nameSource2 = textBeforeBrackets;
          item.nameSource = textBeforeBrackets;
          console.log('Updated Item:', item);
        }
      }
    });
    });
  }
  
  ngOnInit() {
    this.filteredUsers = this.users;
    this.getEmployers();
    this.getLink();
    this.getType();
    //set the api link of the Item to this.gs.
    this.getTitle();
    this.getNocById();
  }
  logGrafana!: boolean;
  loading!: boolean;
  selectedCount = 0;

  // Call this method whenever a checkbox's state changes
  updateSelectedCount() {
    this.selectedCount = this.items.filter(item => item.selectedIndice).length;
  }
  
  // Use this method in your HTML to determine whether to show or hide a checkbox
  shouldDisplayCheckbox() {
    if (this.selectedCount < 4) {
      return true;
    }
    return false;
  }
  
  onChartSelected(indice: number): void {
    this.loading = true; // Set loading to true when the method is triggered

    //update the typeSource of the items by the name of indice
   
    if (indice == 1) {
      //update the items nameSource
      this.items.forEach((item) => {
        if (item.type === 'content') {
          item.nameService = 'Grafana';
        }
      });
      this.gs.VerifyGrafanaUser(this.sesM.getData().company).subscribe(
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
      typeSource: '',
      selectedIndice: false,
    };
    this.items = this.items.filter((item) => item.type === 'content');
    this.items.push({
      type: 'add',
      id: 0,
      number: newNumber + 1,
      apiLink: '',
      nameSource: '',
      typeSource: '',
      selectedIndice: false,
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
    const selectedUsers =
      this.filteredUsers.filter((user) => user.selected) ?? [];
    let dataitems: any[] = [];

    this.items.forEach((item) => {
      if (item.type === 'content') {
        dataitems.push({
          URL: item.apiLink,
          name: item.nameSource,
          type: item.typeSource,
          graphId: item.graphId,
          service: item.nameService,
         position:item.number,
         selectedIndice:item.selectedIndice,
        });
      }
    });

    let data = {
      name: this.nocroomname,
      creator: this.sesM.getData().company,
      monitors: dataitems,
      users: selectedUsers.map((user) => user?._id),
      isHidden: false,
    };

    this.cs.updateNocRoom(this.idNocRoom,data).subscribe((res: any) => {
      console.log(res);
      this.msjerror = 'Noc Room updated successfully';
      this.alert.push({ type: 'success', message: this.msjerror });
    });
  }

  deleteItem(itemId: number,idGraf:any,_idMonitor:any) {
    const item = this.items.find((item) => item.id === itemId);
    
    if (item) {
      item.active = false;
      this.items = this.items.filter((item) => item.id !== itemId);
      this.items
        .filter((item) => item.type === 'content')
        .forEach((item, index) => (item.number = index + 1));

        if (idGraf) {
          this.graphserv.DeleteGrafanaById(idGraf).subscribe((res: any) => {console.log(res)});
          this.graphserv.deleteMonitor(_idMonitor).subscribe((res: any) => {console.log(res)});

        
        }
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
  openGrafanaConfig(id: any, idGraf: any = null) { // Default `idGraf` to null if not provided
    const dialogData: { id: any, _idgraf?: any } = { id: id }; // Initialize with mandatory `id`
    
    if (idGraf) { // Check if `idGraf` exists and is not null
      dialogData._idgraf = idGraf; // Add `_idgraf` to the data if it exists
    }
  
    const dialogRef = this.dialog.open(GrafanaEditConfiguration, {
      data: dialogData,
      width: '900px', // Customize the size as needed
      height: 'auto', // 'auto' size will adjust the height based on the content
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
   formatEmail(email:any) {
    let atIndex = email.indexOf('@');
    return email.substring(0, atIndex + 1) + '....';
}
copyEmail(user:any) {
  navigator.clipboard.writeText(user)
      .then(() => alert('Email copied to clipboard!'))
      .catch(err => console.error('Failed to copy email: ', err));
}
  
  datanoc:any=[]
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getNocById() {
    this.cs.getNocRoomById(this.idNocRoom).subscribe((data) => {
      this.datanoc = data;
      console.log(this.datanoc);
//extract the monitors then it position
      this.datanoc.monitors.forEach((item: { position: any; URL: any; name: any; type: any; service: any; graphId: any;_id:any;selectedIndice:any;users:any }) => {
        this.items.push({
          type: 'content',
          id: this.nextId++,
          number: item.position,
          apiLink: item.URL,
          nameSource: item.name,
          typeSource: item.type,
          nameService: item.service,
          graphId: item.graphId,
          selectedIndice: item.selectedIndice??false,
          active: true,
          _idMonitor: item._id,
        });
      });
      this.items = this.items.filter((item) => item.type === 'content');
      this.items.push({
        type: 'add',
        id: 0,
        number: this.items.length + 1,
        apiLink: '',
        nameSource: '',
        typeSource: '',
        selectedIndice: false,


      });
      this.nocroomname = this.datanoc.name;
      this.datanoc.users.forEach((user: { _id: string; }) => {
        this.filteredUsers.forEach((user2) => {
          if (user2._id === user._id) {
            user2.selected = true;
            this.selectedUsers.push(user2);
          }
        });
      });
    });
  }
  ngAfterViewInit(): void {
   
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
  selector: 'dialog-grafana-dialog',
  templateUrl: 'grafanaedit.html',
  styleUrls: ['editnoc.component.css'],
})
export class GrafanaEditConfiguration implements OnInit {
  @Output() urlGenerated = new EventEmitter<{ index: number; url: string }>();

  dataT: any = [];
  dataTUid: any = [];
  nextUid: boolean = false;
  searchText = '';
  searchTextuid = '';
  loading!: boolean;

  variableForm: FormGroup = new FormGroup({}); // Initialize empty form group

  idPosition: any;
idgraf:any;
  //get the config of the modal from the openDialog

  dataTargets: Target[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gs: GrafanaService,
    private sessionManagerService: SessionManagerService,
    public dialog: MatDialog
  ) {
    this.idgraf = data._idgraf ?? null;
    this.idPosition = data.id;
    console.log("IDGRAF", this.idgraf);
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
  getTemplating: any = [];
  getDashboradUid(id: any) {
    this.gs.getDashbordUid(id).subscribe((res: any) => {
      // console.log(res);
      this.dataTUid = res.panels;
      this.getTemplating = res.templatingQueries;
      console.log("ELECTD",this.dataTUid);
      console.log(this.getTemplating);
      this.nextUid = true;
      // Reset the form with new fields
      //loop panels to get the target and it extractedValues
    });
  }
  formatVariableName(variableName: string): string {
    return variableName.replace('$', '');
  }
  dropdownVariables: { [key: string]: any[] } = {};
  listClinets:any=[]
titleSelected:any;
  getTargets(data: any) {
    if (data && Array.isArray(data)) {
      this.dataTargets = data;
      this.variableForm = new FormGroup({});
      // Assuming data is an array of targets, each with an array of extracted variables
      this.dataTargets.forEach((target: Target) => {
        console.log('Target:', target);
        target.extractedVariables.forEach((variable: Variable) => {
          // Normalize variable name by removing special characters like '$', '{', and '}'
          const normalizedVariableName = variable.variable.replace(
            /[${}]/g,
            ''
          );
          console.log('Normalized Variable:', normalizedVariableName);
          this.variableForm.addControl(
            normalizedVariableName,
            new FormControl('')
          );

          // Loop through the getTemplating and check if name exists in the extractedVariables
          this.getTemplating.forEach((element: any) => {
            console.log('Element:', element.name);
            console.log('Variable:', normalizedVariableName);

            // Check if the name in the getTemplating matches the normalized variable name
            if (element.name === normalizedVariableName) {
              console.log('Matched:', element);
              const currentPanel = this.dataTargetSelected.targets;
              console.log('Selected current Panel:', currentPanel);
              this.selectedPanel = this.dataTargetSelected.type;
              console.log('selected Panel:', this.selectedPanel);

              console.log("Title selected",this.dataTargetSelected.title)
              if (currentPanel && currentPanel.length > 0) {
                const target2 = currentPanel[0];
                console.log('Selected Target:', target);

                let info: any = {
                  Company: this.sessionManagerService.getData().company,
                  datasourceUid: target2.datasource,
                  query: element.query,
                };
                console.log('Info:', info);
                this.gs.ExecuteQueryByDashboard(info).subscribe((res: any) => {
                  console.log('Query Response:', res);

                  // Add the extracted variables to the dropdown
                  const extractedValues = res;
                  console.log('Extracted Values:', extractedValues);
                  this.listClinets=extractedValues;
                  this.dropdownVariables[normalizedVariableName] =
                    extractedValues;
                  console.log('Dropdown Variables:', this.dropdownVariables);
                });
              }
            }
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
    extractedVariables: [],
  };
  selectTarget(panel: any) {
    console.log('Selected Target:', this.selectedTarget);

    return (this.selectedTarget = panel); // Assuming 'panel' has all required properties
  }
  dataTargetSelected: any = [];
  selectedPanelIndex: any;
  selectedPanel: any;
  typeData: any;

  idGraphGrafana: any;

  onSubmit() {
    // Extract values from the form
    const formValues = this.variableForm.value;
    console.log('Form Values:', formValues);

    // Convert date variables dynamically and keep track of time variables
    const variables: { [key: string]: any } = {};
    let fromMillis: any;
    let toMillis: any; // Variables to hold millisecond values

    Object.keys(formValues).forEach((key) => {
      // Convert date fields and add them with specific keys
      if (this.getFieldType(key) === 'date') {
        const date = new Date(formValues[key]);
        const formattedKey = this.formatVariableName(key);
        const millis = date.getTime();
        if (key.includes('From')) {
          fromMillis = millis.toString(); // Capture From time in milliseconds
        } else if (key.includes('To')) {
          toMillis = millis.toString(); // Capture To time in milliseconds
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
    this.selectedPanel = this.dataTargetSelected.type;
    const title=this.dataTargetSelected.title;
console.log("tiiiitile",title)
this.gs.changeMessageTitle(title+'['+this.idPosition+']');

    console.log('selected Panel:', this.selectedPanel);
    if (currentPanel && currentPanel.length > 0) {
      const target = currentPanel[0];
      console.log('Selected Target:', target);
      let datasour: any = {
        Company: this.sessionManagerService.getData().company,
        uid: target.datasource,
      };
      this.gs.getDataSource(datasour).subscribe((res) => {
        this.typeData = res;
        let data: any = {
          Company: this.sessionManagerService.getUserDetails()?.company,
          datasourceType: this.typeData,
          datasourceUid: target.datasource,
          rawSql: target.query,
          from: fromMillis, // Use captured From time in milliseconds
          to: toMillis,
          typegraph: this.selectedPanel, // Use captured To time in milliseconds
          refId: target.refId,
          format: target.format,
          variables: {
            ...variables,
          },
          Clients:this.listClinets
        };
        //this.selectedPanel
        console.log('Data to send:', data);
if(this.idgraf){
        this.gs.updateExecutedQuery(data,this.idgraf).subscribe((res) => {
          console.log('Query Response:', res);
          this.idGraphGrafana = res._id;

          //get the host to construire a url
          let host = window.location.host;
          let protocol = window.location.protocol;
          this.url =
            protocol +
            '//' +
            host +
            '/graphs/showGraph/' +
            this.idGraphGrafana +
            '/' +
            this.idPosition +
            '/' +
            this.sessionManagerService.getData().company;
          //  this.urlGenerated.emit({ index: this.someIndex, url: this.url });

          this.gs.changeMessage(this.url);
          this.gs.changeMessageType(this.selectedPanel+this.idPosition );
          console.log('url', this.url);
          this.success = true;
          setTimeout(() => { this.dialog.closeAll(); }, 1000);
        });}
        else{
          this.gs.ExecuteQuery(data).subscribe((res) => {
            console.log('Query Response:', res);
            this.idGraphGrafana = res._id;
  
            //get the host to construire a url
            let host = window.location.host;
            let protocol = window.location.protocol;
            this.url =
              protocol +
              '//' +
              host +
              '/graphs/showGraph/' +
              this.idGraphGrafana +
              '/' +
              this.idPosition +
              '/' +
              this.sessionManagerService.getData().company;
            //  this.urlGenerated.emit({ index: this.someIndex, url: this.url });
  
            this.gs.changeMessage(this.url);
            this.gs.changeMessageType(this.selectedPanel+this.idPosition );
            console.log('url', this.url);
            this.success = true;
            setTimeout(() => { this.dialog.closeAll(); }, 1000);
          });
        }
      });
    } else {
      console.error('No target data available');
    }
  }
  close() {
    this.dialog.closeAll();
  }
  success!: boolean;
  url!: any;
}
interface ConvertedDates {
  [key: string]: number | string; // Allows indexing with a string and can contain numbers or strings
}
