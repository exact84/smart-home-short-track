import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, finalize, Observable, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  public currentUser = signal<User | undefined>(undefined);
  public loading = signal(true);
  private router = inject(Router);
  public isLoggedIn = computed(() => !!this.currentUser());

  public login(credentials: { userName: string; password: string }): Observable<User> {
    const { userName, password } = credentials;
    const body = { userName, password };
    return this.http.post<{ token: string }>('user/login', body).pipe(
      tap((response) => this.tokenService.saveToken(response.token)),
      switchMap((response) => this.loadUserData(response.token)),
      catchError((error) => throwError(() => error)),
    );
  }

  public loadUserData(token: string): Observable<User> {
    this.loading.set(true);
    return this.http
      .get<User>('user/profile', { headers: { Authorization: `Bearer ${token}` } })
      .pipe(
        tap((response) => {
          this.currentUser.set(response);
        }),
        catchError((error) => {
          console.log(error);
          this.tokenService.deleteToken();
          return throwError(() => error);
        }),
        finalize(() => this.loading.set(false)),
      );
  }

  public logout(): void {
    this.tokenService.deleteToken();
    this.currentUser.set(undefined);
    this.router.navigate(['login']);
  }
}
