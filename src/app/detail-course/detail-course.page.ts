import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Lesson {
  number: number;
  title: string;
  duration: string;
}

interface CurriculumPart {
  partNumber: number;
  title: string;
  lessons?: Lesson[];
}

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.page.html',
  styleUrls: ['./detail-course.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailCoursePage implements OnInit {
  activeTab: 'description' | 'curriculum' | 'instructor' = 'description';
  isDescriptionExpanded: boolean = false;
  isInstructorExpanded: boolean = false;
  
  // Rating and state mock data
  isWishlisted: boolean = false;
  isAddedToCart: boolean = false;

  curriculumParts: CurriculumPart[] = [
    {
      partNumber: 1,
      title: 'Before web dev Journey',
      lessons: [
        { number: 1, title: 'Course Introduction - Roadmap', duration: 'Video - 11.30 mnt' },
        { number: 2, title: 'Meet Your Instructor', duration: 'Video - 05.30 mnt' },
        { number: 3, title: "Let's talk about AI hype", duration: 'Video - 06.30 mnt' },
        { number: 4, title: 'Jobs salary range and skills', duration: 'Video - 10.00 mnt' },
        { number: 5, title: 'What tools you need for web development', duration: 'Video - 19.56 mnt' }
      ]
    },
    {
      partNumber: 2,
      title: 'Code file - Download here'
    },
    {
      partNumber: 3,
      title: 'Basic of web Development'
    }
  ];

  constructor(
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  goBack() {
    // Navigate back to the previous page
    window.history.back();
  }

  setActiveTab(tab: 'description' | 'curriculum' | 'instructor') {
    this.activeTab = tab;
  }

  toggleDescription() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  toggleInstructor() {
    this.isInstructorExpanded = !this.isInstructorExpanded;
  }

  async toggleWishlist() {
    this.isWishlisted = !this.isWishlisted;
    const message = this.isWishlisted ? 'Added to wishlist' : 'Removed from wishlist';
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      color: 'dark',
      position: 'bottom'
    });
    await toast.present();
  }

  async toggleCart() {
    this.isAddedToCart = !this.isAddedToCart;
    const message = this.isAddedToCart ? 'Added to cart' : 'Removed from cart';
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      color: 'dark',
      position: 'bottom'
    });
    await toast.present();
  }

  async buyNow() {
    this.router.navigate(['/checkout']);
  }
}
