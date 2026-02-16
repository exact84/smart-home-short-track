import { Injectable } from '@angular/core';
import { App } from '../app';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public saveToken(token: string) {
    localStorage.setItem('token ' + App.name, token);
  }

  public getToken(): string | undefined {
    return localStorage.getItem('token ' + App.name) || undefined;
  }

  public deleteToken() {
    localStorage.removeItem('token ' + App.name);
  }
}
