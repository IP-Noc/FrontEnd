import { Component, OnInit } from '@angular/core';
import UserModel from 'src/app/model/UserModel';
import { AdminService } from 'src/app/services/admin/admin.service';


const USERS: UserModel[] = [
  // ... Populate this array with instances of UserModel
];
@Component({
  selector: 'app-listclient',
  templateUrl: './listclient.component.html',
  styleUrls: ['./listclient.component.css']
})
export class ListclientComponent implements OnInit {
  searchText:any;

  page = 1;
  pageSize = 4;
  collectionSize = USERS.length;
  users!: UserModel[];

  constructor(private sA:AdminService) {
    this.refreshUsers();
  }

  refreshUsers() {
    this.users = USERS
      .map((user, i) => ({ id: i + 1, ...user }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

getUsers(){
  this.sA.ListCompanys().subscribe(
    (data:any)=>{
      this.users=data;
      console.log(data);
    }
  )
}
  ngOnInit(): void {
this.getUsers();
  }
}
