import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface Category {
  title: string;
  icon: string;
  color: string;
  background: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {
  searchQuery: string = '';
  
  topSearches: string[] = [
    'word', 'excel', 'desain', 'musik', 'c#',
    'sql', 'python', 'php', 'cyber security'
  ];

  categories: Category[] = [
    { title: 'Web Development', icon: 'code-slash-outline', color: '#852920', background: 'rgba(133, 41, 32, 0.08)' },
    { title: 'Mobile Development', icon: 'phone-portrait-outline', color: '#2980b9', background: 'rgba(41, 128, 185, 0.08)' },
    { title: 'Cyber Security', icon: 'shield-checkmark-outline', color: '#27ae60', background: 'rgba(39, 174, 96, 0.08)' },
    { title: 'Graphic Design', icon: 'color-palette-outline', color: '#8e44ad', background: 'rgba(142, 68, 173, 0.08)' },
    { title: 'Music & Audio', icon: 'musical-notes-outline', color: '#d35400', background: 'rgba(211, 84, 0, 0.08)' },
    { title: 'Office Productivity', icon: 'briefcase-outline', color: '#2c3e50', background: 'rgba(44, 62, 80, 0.08)' }
  ];

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  selectSearch(term: string) {
    this.searchQuery = term;
    this.onSearch();
  }
}