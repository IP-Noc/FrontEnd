import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SessionManagerService } from '../services/session/session-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  CurrentYear = new Date().getFullYear();

  sidebarToggled = false;

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
  }

}
