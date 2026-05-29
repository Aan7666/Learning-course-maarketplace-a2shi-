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
} from '@ionic/angular/standalone'; // 1. Ubah ke standalone

import { addIcons } from 'ionicons'; // 2. Import fungsi addIcons
import {
  home,
  playCircleOutline,
  searchOutline,
  heartOutline,
  personCircleOutline
} from 'ionicons/icons'; // 3. Import objek ikon yang kamu pakai

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
    IonLabel // 4. Daftarkan komponen spesifik di sini menggantikan IonicModule
  ]
})
export class TabsPage implements OnInit {

  constructor() {
    // 5. Daftarkan ikon di dalam constructor agar bisa dibaca oleh HTML
    addIcons({
      home,
      'play-circle-outline': playCircleOutline,
      'search-outline': searchOutline,
      'heart-outline': heartOutline,
      'person-circle-outline': personCircleOutline
    });
  }

  ngOnInit() {
  }

}