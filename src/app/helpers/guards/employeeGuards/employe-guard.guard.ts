import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionManagerService } from 'src/app/services/session/session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeGuardGuard implements CanActivate {
  constructor(
    private sessionMan: SessionManagerService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const details = this.sessionMan.getUserDetails();
    return details != null &&
      details.role === 'EMPLOYEE'
      ? true
      : this.router.parseUrl('/login');
  }

}
