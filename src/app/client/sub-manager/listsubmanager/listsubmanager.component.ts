import { Component, OnInit } from '@angular/core';
import UserModel from 'src/app/model/UserModel';
import { CompanyService } from 'src/app/services/company/company.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';

@Component({
  selector: 'app-listsubmanager',
  templateUrl: './listsubmanager.component.html',
  styleUrls: ['./listsubmanager.component.css']
})
export class ListsubmanagerComponent implements OnInit{
  searchText:any;
  USERS: UserModel[] = [
   // ... Populate this array with instances of UserModel
 ];

 page = 1;
 pageSize = 4;
 collectionSize = this.USERS.length;
 users!: UserModel[];

 constructor(private cs: CompanyService, private sessionMan: SessionManagerService) {
  this.refreshUsers();
 }

 refreshUsers() {
   this.users = this.USERS
     .map((user, i) => ({ id: i + 1, ...user }))
     .slice(
       (this.page - 1) * this.pageSize,
       (this.page - 1) * this.pageSize + this.pageSize
     );
 }
 getSubManagers(){
   this.cs.getSubManagers().subscribe((res:any)=>{
     console.log(res);
     this.users=res;
   })
 }
 ngOnInit(): void {
this.getSubManagers();

 }
}
