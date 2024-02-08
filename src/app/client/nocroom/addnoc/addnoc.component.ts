import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../../model/Item';
import UserModel from 'src/app/model/UserModel';
import { CompanyService } from 'src/app/services/company/company.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Alert } from 'src/app/model/Alerts/Alert';
@Component({
  selector: 'app-addnoc',
  templateUrl: './addnoc.component.html',
  styleUrls: ['./addnoc.component.css']
})
export class AddnocComponent implements OnInit{
  @ViewChild('apiLinkInput') apiLinkInput!: ElementRef;

  nextId = 1;

  nextUser=0;
  // Initialize the items with the type explicitly defined using the Item interface
searchQuery: any;
searchText ="";

extractedName = "Api link";
nocroomname="";
  constructor(private cs: CompanyService , private sockS:SocketService) { }
  items: Item[] = [{ type: 'add', id: 0, number: 1 , apiLink: '', selectedChart: '',nameSource:''}];
  msjerror="";
  loading = false;

  alert:Alert[]=[]
  addNewItem(index: number) {
    const newNumber = this.items.filter(item => item.type === 'content').length + 1; // Compute correct number for new item
    this.items[index] = { type: 'content', id: this.nextId++, number: newNumber, active: true, apiLink: '', selectedChart: '', nameSource: '' };
    this.items = this.items.filter(item => item.type === 'content'); // Exclude 'add' items
    this.items.push({
      type: 'add', id: 0, number: newNumber + 1,
      apiLink: '',
      selectedChart: '',
      nameSource: ''
    }); // Add new 'add' button
  }

  nextStep(){
    console.log("clicked");
    console.log(this.nextUser);
    this.nextUser=1;
  }

//method to consol the added items
close(alert: Alert) {
  this.alert.splice(this.alert.indexOf(alert), 1);
}

save() {
  console.log(this.items);
  const selectedUsers = this.filteredUsers.filter(user => user.selected);
  console.log(selectedUsers);

  // Initialize an empty array for data items
  let dataitems: any[] = [];

  // Loop through the items and get the apiLink and selectedChart
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
    monitorsData: dataitems,
    usersIds: selectedUsers.map(user => user._id),
    isHidden: true
  };

  console.log("Data", data);
  this.cs.addNocRoom(data).subscribe((res: any) => {
    console.log(res);
    this.sockS.sendNocRoom(data);
    this.msjerror="Noc Room added successfully";
    this.alert.push({type:"success",message:this.msjerror});
  });
}


  deleteItem(itemId: number) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.active = false;
      // Remove item id from items list
      this.items = this.items.filter(item => item.id !== itemId);
      // Update the number of the remaining items
      this.items.filter(item => item.type === 'content').forEach((item, index) => item.number = index + 1);
    }
  }

  getEmployers(){
    this.cs.getEmployers().subscribe((res:any)=>{
      console.log(res);
      this.filteredUsers =res;
    })
  }

  users: UserModel[] = [  ];
  // Populate with your user data
  filteredUsers: UserModel[] = []; // Initialize with an empty array

  ngOnInit() {
    this.filteredUsers = this.users;
    this.getEmployers();

  }
  selectedUsers: any[] = [];

  // Other component code

  selectUser(user: any) {
    user.selected = !user.selected; // Toggle the selected state

    if (user.selected) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser !== user);
    }

    console.log('Selected Users:', this.selectedUsers);
  }

}
