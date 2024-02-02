import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  base64_decode(arg0: any) {
    throw new Error('Method not implemented.');
  }
  url_decode(t: string | null): any {
    throw new Error('Method not implemented.');
  }
  create(arg0: string, redirect_to: any) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

    // Gets a parameter's value from the current URL

    getUrlParameter(sParam: string) {
      const params = new URLSearchParams(window.location.search);
      return params.get(sParam);
    }
    // Decodes a base64 encoded string
    b64DecodeUnicode(str: string) {
      return decodeURIComponent(atob(str).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
}
