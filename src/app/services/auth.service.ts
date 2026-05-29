import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  email: string;
  fullName: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'a2shi_users';
  private readonly SESSION_KEY = 'a2shi_current_users';

  constructor(private http: HttpClient) { }

  /**
   * Get all registered users from LocalStorage
   */
  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  /**
   * Save users list to LocalStorage
   */
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  /**
   * Register a new user
   */
  register(user: User): { success: boolean; message: string } {
    if (!user.email || !user.fullName || !user.password) {
      return { success: false, message: 'All fields are required.' };
    }

    const users = this.getUsers();

    // Check if email already registered
    const emailExists = users.some(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (emailExists) {
      return { success: false, message: 'This email is already registered.' };
    }

    // Check if full name (username) already registered
    const usernameExists = users.some(u => u.fullName.toLowerCase() === user.fullName.toLowerCase());
    if (usernameExists) {
      return { success: false, message: 'This full name is already registered.' };
    }

    // Add user
    users.push(user);
    this.saveUsers(users);

    return { success: true, message: 'Registration successful!' };
  }

  /**
   * Authenticate a user locally by email/username and password
   */
  loginLocal(emailOrUsername: string, passwordInput: string): { success: boolean; message: string; user?: User } {
    if (!emailOrUsername || !passwordInput) {
      return { success: false, message: 'Username and password are required.' };
    }

    const users = this.getUsers();
    const query = emailOrUsername.toLowerCase();

    // Find matching user
    const foundUser = users.find(u =>
      (u.email.toLowerCase() === query || u.fullName.toLowerCase() === query) &&
      u.password === passwordInput
    );

    if (!foundUser) {
      return { success: false, message: 'Invalid username/email or password.' };
    }

    // Set current active user session (omit password for security)
    const sessionUser: User = {
      email: foundUser.email,
      fullName: foundUser.fullName
    };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionUser));

    return { success: true, message: 'Login successful!', user: sessionUser };
  }

  /**
   * Authenticate a user via Laravel Backend API
   */
  login(email: string, passwordInput: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, {
      email: email,
      password: passwordInput
    }).pipe(
      tap(response => {
        if (response && response.success && response.user) {
          // Map backend response 'name' to 'fullName' for UI compatibility
          const sessionUser: User = {
            email: response.user.email,
            fullName: response.user.name
          };
          localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionUser));
        }
      })
    );
  }

  /**
   * Get current active user session
   */
  getCurrentUser(): User | null {
    const sessionJson = localStorage.getItem(this.SESSION_KEY);
    return sessionJson ? JSON.parse(sessionJson) : null;
  }

  /**
   * End user session
   */
  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
