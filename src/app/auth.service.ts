import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as auth0 from 'auth0-js';

// (window as any).global = global;

@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
      clientID: 'X9FkWnJIuJ3HUipTfCOLWrOrTU0Za38l',
      domain: 'isys.auth0.com',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:4200',
      scope: 'openid'
    });

    constructor(public router: Router) {}

    public login(): void {
      this.auth0.authorize();
    }

    public handleAuthentication(): void {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/dashboard']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
      });
    }

    private setSession(authResult): void {
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access-token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
      localStorage.removeItem('access-token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // Access Token's expiry time
      const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

}
