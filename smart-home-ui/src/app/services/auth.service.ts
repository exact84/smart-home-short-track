import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  public currentUser = signal<object | undefined>(undefined);
  public loading = signal(true);
  private router = inject(Router);
  public isLoggedIn = computed(() => !!this.currentUser());

  public login(credentials: { username: string; password: string }) {
    const { username, password } = credentials;
    const body = { username, password };
    return this.http.post<{ token: string }>('api/login', body).pipe(
      tap((response) => this.tokenService.saveToken(response.token)),
      switchMap((response) => this.loadUserData(response.token)),
    );
  }

  public loadUserData(token: string) {
    this.loading.set(true);
    return this.http.get('user/profile', { headers: { Authorization: `Bearer ${token}` } }).pipe(
      tap((response) => this.currentUser.set(response)),
      catchError((error) => {
        this.tokenService.deleteToken();
        return of(() => error);
      }),
      tap(() => this.loading.set(false)),
    );
  }

  public logout() {
    this.tokenService.deleteToken();
    this.currentUser.set(undefined);
    this.router.navigate(['login']);
  }
}
