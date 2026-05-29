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

import { addIcons } from 'ionicons'; 
import {
  home,
  homeOutline,            // <-- DITAMBAHKAN (Line 18)
  playCircle,             // <-- DITAMBAHKAN (Line 19)
  playCircleOutline,
  search,                 // <-- DITAMBAHKAN (Line 21)
  searchOutline,
  heart,                  // <-- DITAMBAHKAN (Line 23)
  heartOutline,
  personCircle,           // <-- DITAMBAHKAN (Line 25)
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

  activeTab: string = 'home'; // <-- DITAMBAHKAN (Line 48)

  constructor() {
    addIcons({
      home,
      'home-outline': homeOutline,                       // <-- DITAMBAHKAN (Line 53)
      'play-circle': playCircle,                         // <-- DITAMBAHKAN (Line 54)
      'play-circle-outline': playCircleOutline,
      'search': search,                                  // <-- DITAMBAHKAN (Line 56)
      'search-outline': searchOutline,
      'heart': heart,                                    // <-- DITAMBAHKAN (Line 58)
      'heart-outline': heartOutline,
      'person-circle': personCircle,                     // <-- DITAMBAHKAN (Line 60)
      'person-circle-outline': personCircleOutline
    });
  }

  ngOnInit() {}

  // <-- DITAMBAHKAN (Line 67 - 69)
  tabChanged(event: any) {
    this.activeTab = event.tab;
  }

}