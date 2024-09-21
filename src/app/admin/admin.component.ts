import { Component, OnInit } from '@angular/core';
import { SessionManagerService } from '../services/session/session-manager.service';
import { Router } from '@angular/router';

/**
 * @class AdminComponent
 * @implements {OnInit}
 * The AdminComponent class is responsible for handling the admin dashboard functionalities,
 * including toggling the sidebar and logging out the user.
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  /**
   * @property {number} CurrentYear - The current year, used in the footer for copyright information.
   */
  CurrentYear = new Date().getFullYear();

  role!:any;
  name!:any;
  /**
   * @property {boolean} sidebarToggled - Indicates whether the sidebar is toggled.
   */
  sidebarToggled = false;

  /**
   * @property {string} user - The name of the currently logged-in user, used in the welcome message.
   */
  user = 'admin';

  /**
   * Toggles the sidebar between collapsed and expanded states.
   * @returns {void}
   */
  toggleSidebar(): void {
    this.sidebarToggled = !this.sidebarToggled;
  }

  /**
   * Constructor for AdminComponent.
   * @param {SessionManagerService} SessionManagerService - Service for managing user sessions.
   * @param {Router} router - Router service for navigating between routes.
   */
  constructor(
    private SessionManagerService: SessionManagerService,
    private router: Router
  ) {}

  /**
   * Logs the user out of the application by disconnecting the session
   * and navigating to the login page after a delay.
   * @returns {void}
   */
  logout(): void {
    this.SessionManagerService.disconnectSession();
    setTimeout(() => {
      this.router.navigate(['./login']);
    }, 1000);
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @returns {void}
   */
  ngOnInit(): void {
    this.role=this.SessionManagerService.getData()?.role;
    this.name=this.SessionManagerService.getData()?.name;

  }
}
