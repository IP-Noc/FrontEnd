import { Component, OnInit } from '@angular/core';
import UserModel from 'src/app/model/UserModel';
const USERS: UserModel[] = [
  // ... Populate this array with instances of UserModel
];

@Component({
  selector: 'app-listsubmanger',
  templateUrl: './listsubmanger.component.html',
  styleUrls: ['./listsubmanger.component.css']
})
export class ListsubmangerComponent implements OnInit {
  searchText:any;

  page = 1;
  pageSize = 4;
  collectionSize = USERS.length;
  users!: UserModel[];

  constructor() {
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
  ngOnInit(): void {

  }
}
