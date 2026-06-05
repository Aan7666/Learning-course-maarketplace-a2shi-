import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Redirect after 3 seconds depending on privacy policy acceptance
    setTimeout(() => {
      const accepted = localStorage.getItem('privacy_policy_accepted');
      if (accepted === 'true') {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/privacy-policy', { replaceUrl: true });
      }
    }, 3000);
  }
}
