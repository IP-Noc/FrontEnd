import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import JwtResponse  from 'src/app/model/JwtResponse';
import { environment } from '../../../environments/environment.development';

import { SessionManagerService } from '../session/session-manager.service';
import HTTP_OPTIONS from '../HTTP_OPTIONS';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  constructor(
    private http: HttpClient,
    private session: SessionManagerService
  ) {}

  public refreshUserToken() {
    const expired = this.session.getAccessToken();

    return this.http.post<JwtResponse>(
      `${environment.BASE_URL}/refresh-token`,
      {
        expired: expired,
      },
      HTTP_OPTIONS
    );
  }
}
