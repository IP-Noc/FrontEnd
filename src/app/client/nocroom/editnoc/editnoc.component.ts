import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

@Component({
  selector: 'app-editnoc',
  templateUrl: './editnoc.component.html',
  styleUrls: ['./editnoc.component.css']
})
export class EditnocComponent implements OnInit{
  @ViewChild('apiLinkInput') apiLinkInput!: ElementRef;

  displaybuttpnGrafana: boolean = false;
  nextId = 1;
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

  ) {

    this.id = this.router.snapshot.paramMap.get('id');
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
    };
    this.items = this.items.filter((item) => item.type === 'content');
    this.items.push({
      type: 'add',
      id: 0,
      number: newNumber + 1,
      apiLink: '',
      nameSource: '',
      typeSource: '',
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
         position:item.number
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

    this.cs.addNocRoom(data).subscribe((res: any) => {
      console.log(res);
      this.msjerror = 'Noc Room added successfully';
      this.alert.push({ type: 'success', message: this.msjerror });
    });
  }

  deleteItem(itemId: number,idGraf:any) {
    const item = this.items.find((item) => item.id === itemId);
    
    if (item) {
      item.active = false;
      this.items = this.items.filter((item) => item.id !== itemId);
      this.items
        .filter((item) => item.type === 'content')
        .forEach((item, index) => (item.number = index + 1));

        if (idGraf) {
          this.graphserv.DeleteGrafanaById(idGraf).subscribe((res: any) => {console.log(res)});

        
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
  datanoc:any=[]
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getNocById() {
    this.cs.getNocRoomById(this.id).subscribe((data) => {
      this.datanoc = data;
      console.log(this.datanoc);
//extract the monitors then it position
      this.datanoc.monitors.forEach((item: { position: any; apiLink: any; name: any; type: any; service: any; graphId: any; }) => {
        this.items.push({
          type: 'content',
          id: this.nextId++,
          number: item.position,
          apiLink: item.apiLink,
          nameSource: item.name,
          typeSource: item.type,
          nameService: item.service,
          graphId: item.graphId,
          active: true,
          
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


}
