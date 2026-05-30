import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/angular/standalone';
import { Router } from '@angular/router'; // <-- DITAMBAHKAN

import { addIcons } from 'ionicons'; 
import {
  home,
  homeOutline,
  playCircle,
  playCircleOutline,
  search,
  searchOutline,
  heart,
  heartOutline,
  personCircle,
  personCircleOutline
} from 'ionicons/icons'; 

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel 
  ]
})
export class TabsPage implements OnInit {

  activeTab: string = 'home';
  isLoggedIn: boolean = false; // <-- DITAMBAHKAN

  constructor(private router: Router) { // <-- DITAMBAHKAN Router
    addIcons({
      home,
      'home-outline': homeOutline,
      'play-circle': playCircle,
      'play-circle-outline': playCircleOutline,
      'search': search,
      'search-outline': searchOutline,
      'heart': heart,
      'heart-outline': heartOutline,
      'person-circle': personCircle,
      'person-circle-outline': personCircleOutline
    });
  }

  ngOnInit() {

  // Sementara untuk testing — banner pasti muncul
  //this.isLoggedIn = false;
  
  // Aktifkan ini setelah auth service siap:
  this.isLoggedIn = !!localStorage.getItem('token');
}


  tabChanged(event: any) {
    this.activeTab = event.tab;
  }


  redirectToLogin() { // <-- DITAMBAHKAN
    this.router.navigate(['/login']);
  }

}