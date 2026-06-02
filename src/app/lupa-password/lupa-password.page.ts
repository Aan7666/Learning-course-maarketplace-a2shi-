import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lupa-password',
  templateUrl: './lupa-password.page.html',
  styleUrls: ['./lupa-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LupaPasswordPage implements OnInit {
  emailAddress: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onContinue() {
    if (!this.emailAddress.trim()) {
      alert('Please enter your email address.');
      return;
    }
    
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailAddress.trim())) {
      alert('Please enter a valid email address.');
      return;
    }

    alert('Password reset link has been sent to your email!');
    this.router.navigate(['/login']);
  }

  onClose() {
    this.router.navigate(['/login']);
  }
}
