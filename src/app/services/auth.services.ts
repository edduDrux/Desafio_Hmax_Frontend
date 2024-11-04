import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../pages/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  // Dados simulados para usuários registrados com `id` incluído
  private users: User[] = [
    { id: '1', username: 'manager', password: '123456', role: 'manager' },
    { id: '2', username: 'client', password: '123456', role: 'client' }
  ];

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<User> {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      return of(user);
    } else {
      return throwError(() => new Error('Credenciais inválidas'));
    }
  }

  register(username: string, password: string, role: 'client' | 'manager'): Observable<User> {
    const userExists = this.users.some(u => u.username === username);
    if (userExists) {
      return throwError(() => new Error('Usuário já existe'));
    } else {
      const newUser: User = { id: (this.users.length + 1).toString(), username, password, role };
      this.users.push(newUser);
      return of(newUser);
    }
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}