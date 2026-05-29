import { Injectable } from '@angular/core';

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

  constructor() { }

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
   * Authenticate a user by email/username and password
   */
  login(emailOrUsername: string, passwordInput: string): { success: boolean; message: string; user?: User } {
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
