import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionManagerService } from '../../../services/session/session-manager.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyGuard implements CanActivate {
  constructor(
    private sessionMan: SessionManagerService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const details = this.sessionMan.getUserDetails();
  
    // Check if details exist and role is either 'COMPANY' or 'MANAGER'
    if (details && (details.role === 'COMPANY' || details.role === 'MANAGER')) {
      return true;
    } else {
      // Redirect to login if details are not correct
      return this.router.parseUrl('/login');
    }
  }
  
}
