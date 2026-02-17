import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public saveToken(token: string) {
    localStorage.setItem('token smart-home-exact84', token);
  }

  public getToken(): string | undefined {
    return localStorage.getItem('token smart-home-exact84') || undefined;
  }

  public deleteToken() {
    localStorage.removeItem('token smart-home-exact84');
  }
}
