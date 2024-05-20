import { Component } from '@angular/core';
import UserModel from 'src/app/model/UserModel';
import { CompanyService } from 'src/app/services/company/company.service';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';

@Component({
  selector: 'app-listemp',
  templateUrl: './listemp.component.html',
  styleUrls: ['./listemp.component.css']
})
export class ListempComponent {
disableAction() {
}
eventAvailableAction() {
}
  searchText:any;
   USERS: UserModel[] = [  ];

  page = 1;
  pageSize = 4;
  collectionSize = this.USERS.length;
  users!: any[];

  constructor(private cs: CompanyService, private sessionMan: SessionManagerService) {
    this.refreshUsers();
  }

getEmployers(){
  this.cs.getEmployers().subscribe((res:any)=>{
    console.log(res);
    //loop the res.data
    this.users = res.data;
  })
}

  refreshUsers() {
    this.users = this.USERS
      .map((user, i) => ({ id: i + 1, ...user }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  ngOnInit(): void {
this.getEmployers();
  }
}
