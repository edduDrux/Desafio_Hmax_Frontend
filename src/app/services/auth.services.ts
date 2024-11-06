import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../pages/models/user.model';
import { environment } from '../../environments/environment';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService
  ) {}

  register(username: string, password: string, role: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, { username, password, role })
      .pipe(
        tap(user => {
          this.authStateService.setUser(user);
        }),
        catchError(error => throwError(() => new Error('Falha no registro: ' + error.message)))
      );
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<{ token: string, user: User }>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap(response => {
          const { token, user } = response;
          this.authStateService.setUser(user);
          localStorage.setItem('token', token);
        }),
        map(response => response.user),
        catchError(error => throwError(() => new Error('Falha no login: ' + error.message)))
      );
  }

  logout(): void {
    this.authStateService.setUser(null);
    localStorage.removeItem('token');
  }

  get isLoggedIn(): boolean {
    return this.authStateService.isLoggedIn;
  }
}
