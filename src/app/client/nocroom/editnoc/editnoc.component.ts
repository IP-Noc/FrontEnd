import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/model/Item';
import UserModel from 'src/app/model/UserModel';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-editnoc',
  templateUrl: './editnoc.component.html',
  styleUrls: ['./editnoc.component.css']
})
export class EditnocComponent implements OnInit{

  id!:String;
  items!: Item[] ;
monitors:any=[];
searchText ="";
nocroomname: any;
editnocroomname: any;

  constructor(private router:ActivatedRoute, private cr:CompanyService) {
//get the id from the url params
this.id = this.router.snapshot.params['id'];
   }
   nextId = 1;
   nextUser=0;
   nextStep(){
    console.log("clicked");
    console.log(this.nextUser);
    this.nextUser=1;
  }

   getNocRoomById() {
    this.cr.getNocRoomById(this.id).subscribe((data: any) => {
      console.log(data);

      // Loop through the monitors' IDs
      for (const monitorIds of data.monitors) {
        for (const monitorId of monitorIds) {
          // Call the getMonitorById method for each monitor ID
          this.getMonitorById(monitorId);
        }
      }
    });
  }
  users: UserModel[] = [  ];
  // Populate with your user data
  filteredUsers: UserModel[] = []; // Initialize with an empty array

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
  getMonitorById(monitorId: string) {
    // Call your monitorbyid method or perform any action with the monitorId
    this.cr.getMonitorsById(monitorId).subscribe((monitorData: any) => {
      // Push the monitorData to the monitors array
      this.monitors.push(monitorData);
      console.table(this.monitors);
      this.editnocroomname = monitorData.name;
      //add the monitorData to the items array
      this.items.push({
        type: 'content',
        id: 0,
        number: monitorData.positionInTemplate,
        apiLink: monitorData.apiLink,
        selectedChart: monitorData.selectedChart,
        nameSource: monitorData.nameSource,

      });
    });
  }

  ngOnInit(): void {
    console.log(this.id);
    this.getNocRoomById();
  }

}
