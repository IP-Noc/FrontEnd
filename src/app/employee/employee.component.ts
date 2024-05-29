import { SessionManagerService } from 'src/app/services/session/session-manager.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  CurrentYear = new Date().getFullYear();

  sidebarToggled = false;
role:any;
  toggleSidebar(): void {
    this.sidebarToggled = !this.sidebarToggled;
  }
  constructor( private SessionManagerService:SessionManagerService , private router:Router) { }

  logout() {
    this.SessionManagerService.disconnectSession();
    setTimeout(() => {
      this.router.navigate(['./login']);
    }, 1000);
  }
  ngOnInit(): void {
    this.role=this.SessionManagerService.getData()?.role;
  }
}
