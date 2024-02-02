import { SessionManagerService } from 'src/app/services/session/session-manager.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
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
