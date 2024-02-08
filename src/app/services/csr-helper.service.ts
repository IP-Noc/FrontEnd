import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CsrHelperService {

  constructor(private cookieService: CookieService) {}

  setCookie(name: string, value: string, days?: number) {
    let expiresIn = days ? days : 1;
    this.cookieService.set(name, value, expiresIn, '/');
  }

  getCookie(name: string): string {
    return this.cookieService.get(name);
  }

  deleteCookie(name: string) {
    this.cookieService.delete(name, '/');
  }}
