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
  otpCode: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onContinue() {
    if (!this.otpCode.trim()) {
      alert('Please enter the OTP code.');
      return;
    }
    if (this.otpCode.trim().length !== 6 || isNaN(Number(this.otpCode.trim()))) {
      alert('OTP code must be a 6-digit number.');
      return;
    }

    alert('OTP Code verified successfully!');
    // Redirect to home page
    this.router.navigate(['/tabs']);
  }

  onSendAgain() {
    alert('OTP Code has been resent to your email!');
  }

  onClose() {
    this.router.navigate(['/login']);
  }
}
