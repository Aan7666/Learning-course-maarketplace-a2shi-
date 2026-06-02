import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CheckoutPage implements OnInit, OnDestroy {
  // Current screen step: 1 = Checkout Selection, 2 = Waiting for Payment, 3 = Payment Success
  currentStep: number = 1;

  // Selected Payment Method: 'ewallet' | 'card' | 'bank'
  selectedMethod: string = 'ewallet';

  // State
  isInstructionsOpen: boolean = false;
  countdownText: string = '23:59:45';
  private timerInterval: any;

  // Mock Invoice details
  orderId: string = '#EDU-992384';
  orderDate: string = '20 Mei 2024';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  goBack() {
    if (this.currentStep > 1 && this.currentStep < 3) {
      this.currentStep = 1;
      this.stopTimer();
    } else {
      window.history.back();
    }
  }

  selectMethod(method: string) {
    this.selectedMethod = method;
  }

  toggleInstructions() {
    this.isInstructionsOpen = !this.isInstructionsOpen;
  }

  placeOrder() {
    this.currentStep = 2;
    this.startTimer();
  }

  checkOrderStatus() {
    this.currentStep = 3;
    this.stopTimer();
  }

  viewCourses() {
    this.router.navigate(['/tabs-after-login/courses']);
  }

  startLearning() {
    this.router.navigate(['/tabs-after-login/courses']);
  }

  goToMyCourses() {
    this.router.navigate(['/tabs-after-login/courses']);
  }

  closeCheckout() {
    this.router.navigate(['/tabs-after-login/home']);
  }

  async copyText(text: string, type: string) {
    // Clipboard copy mock
    navigator.clipboard.writeText(text).then(async () => {
      const toast = await this.toastController.create({
        message: `${type} copied to clipboard!`,
        duration: 1000,
        position: 'bottom',
        color: 'dark'
      });
      await toast.present();
    }).catch(async () => {
      const toast = await this.toastController.create({
        message: 'Failed to copy',
        duration: 1000,
        position: 'bottom',
        color: 'warning'
      });
      await toast.present();
    });
  }

  // Timer helpers
  private startTimer() {
    let totalSeconds = 24 * 60 * 60 - 15; // 23 hours, 59 minutes, 45 seconds
    this.stopTimer();
    
    this.timerInterval = setInterval(() => {
      if (totalSeconds <= 0) {
        this.stopTimer();
        return;
      }
      totalSeconds--;
      
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;
      
      this.countdownText = `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private pad(val: number): string {
    return val < 10 ? '0' + val : '' + val;
  }
}
