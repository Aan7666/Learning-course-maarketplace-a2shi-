import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface Star {
  size: number;
  top: number;
  left: number;
  opacity: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class LoginPage implements OnInit {

  stars: Star[] = [];

  // Form properties
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.generateStars();
  }

  generateStars() {
    this.stars = Array.from({ length: 20 }, () => ({
      size: Math.random() * 4 + 2,
      top: Math.random() * 40,
      left: Math.random() * 100,
      opacity: Math.random()
    }));
  }

  onLogin() {
    if (!this.username.trim() || !this.password) {
      alert('Please enter both username/email and password.');
      return;
    }

    const result = this.authService.login(this.username, this.password);
    if (result.success) {
      alert('Login successful!');
      this.router.navigate(['/tabs']);
    } else {
      alert(result.message);
    }
  }

  loginWithGoogle() {
    console.log('Login dengan Google...');
    // Mock Google Login as a valid database session
    const mockGoogleEmail = 'google.user@example.com';
    // Register if doesn't exist, then login
    this.authService.register({
      email: mockGoogleEmail,
      fullName: 'Google User',
      password: 'google_password'
    });
    this.authService.login(mockGoogleEmail, 'google_password');
    alert('Google Login successful!');
    this.router.navigate(['/tabs']);
  }
}