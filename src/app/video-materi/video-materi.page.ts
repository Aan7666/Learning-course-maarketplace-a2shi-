import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Lesson {
  id: string;
  number: number;
  title: string;
  type: 'video' | 'quiz';
  durationText: string;
  durationSeconds: number;
  resourcesCount?: number;
  questionsCount?: number;
}

interface Section {
  title: string;
  lessons: Lesson[];
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

@Component({
  selector: 'app-video-materi',
  templateUrl: './video-materi.page.html',
  styleUrls: ['./video-materi.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VideoMateriPage implements OnInit, OnDestroy {
  activeTab: 'pelajaran' = 'pelajaran';
  
  courseTitle: string = 'Belajar Figma dari awal sampai mahir';
  instructorName: string = 'Frank Esteban';
  instructorTitle: string = 'Figma designer Team';
  
  sections: Section[] = [
    {
      title: 'Bagian 1 - Pembelajaran pemula figma',
      lessons: [
        {
          id: 'b1-l1',
          number: 1,
          title: 'Croping tambah font atur style font',
          type: 'video',
          durationText: 'Video - 08:09 mnt - sumber daya (1)',
          durationSeconds: 489,
          resourcesCount: 1
        },
        {
          id: 'b1-l2',
          number: 2,
          title: 'Tambah warna dan gradient warna',
          type: 'video',
          durationText: 'Video - 08:09 mnt - sumber daya (1)',
          durationSeconds: 489,
          resourcesCount: 1
        },
        {
          id: 'b1-l3',
          number: 3,
          title: 'Tambah warna dan gradient warna',
          type: 'quiz',
          durationText: 'Kuis - 4 pertanyaan',
          durationSeconds: 0,
          questionsCount: 4
        }
      ]
    },
    {
      title: 'Bagian 2 - Pembelajaran pemula figma',
      lessons: [
        {
          id: 'b2-l1',
          number: 1,
          title: 'Croping tambah font atur style font',
          type: 'video',
          durationText: 'Video - 08:09 mnt - sumber daya (1)',
          durationSeconds: 489,
          resourcesCount: 1
        },
        {
          id: 'b2-l2',
          number: 2,
          title: 'Tambah warna dan gradient warna',
          type: 'video',
          durationText: 'Video - 08:09 mnt - sumber daya (1)',
          durationSeconds: 489,
          resourcesCount: 1
        },
        {
          id: 'b2-l3',
          number: 3,
          title: 'Tambah warna dan gradient warna',
          type: 'quiz',
          durationText: 'Kuis - 4 pertanyaan',
          durationSeconds: 0,
          questionsCount: 4
        }
      ]
    }
  ];

  activeLesson!: Lesson;
  activeSectionIndex: number = 0;
  activeLessonIndex: number = 0;

  // Video playback simulation states
  isPlaying: boolean = false;
  currentTime: number = 0;
  videoInterval: any = null;
  videoProgress: number = 0;

  // Interactive Quiz states
  quizActive: boolean = false;
  currentQuestionIndex: number = 0;
  selectedAnswerIndex: number = -1;
  quizCompleted: boolean = false;
  quizScore: number = 0;

  quizQuestions: QuizQuestion[] = [
    {
      question: 'Apa kegunaan utama dari Auto Layout di Figma?',
      options: [
        'Membuat desain responsif yang menyesuaikan ukuran konten secara dinamis',
        'Mengedit foto dan gambar berbasis pixel (raster)',
        'Mengekspor file langsung menjadi format PDF interaktif',
        'Membuat animasi transisi 3D antar screen'
      ],
      correctIndex: 0
    },
    {
      question: 'Bagaimana shortcut keyboard standar untuk membuat Component baru di Figma?',
      options: [
        'Ctrl + Shift + C (atau Cmd + Shift + C)',
        'Ctrl + Alt + K (atau Cmd + Option + K)',
        'Ctrl + Shift + G (atau Cmd + Shift + G)',
        'Ctrl + Z (atau Cmd + Z)'
      ],
      correctIndex: 1
    },
    {
      question: 'Apa kegunaan fitur \'Constraints\' pada objek di Figma?',
      options: [
        'Membatasi jumlah warna yang boleh dipakai dalam satu halaman',
        'Mengontrol perilaku posisi dan ukuran elemen saat frame induknya diubah ukurannya',
        'Menghapus layer yang tidak aktif secara otomatis untuk menghemat memori',
        'Mengunci semua layer agar tidak bisa digeser sama sekali'
      ],
      correctIndex: 1
    },
    {
      question: 'Format file apa saja yang secara bawaan didukung Figma saat melakukan Export?',
      options: [
        'Hanya format PNG dan JPEG saja',
        'PNG, JPG, SVG, dan PDF',
        'EXE, APK, dan DMG saja',
        'MP4, AVI, dan WebM saja'
      ],
      correctIndex: 1
    }
  ];

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {
    // Set initial active lesson to Section 1 Lesson 1
    this.activeLesson = this.sections[0].lessons[0];
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.clearVideoInterval();
  }

  goBack() {
    window.history.back();
  }

  selectLesson(sectionIndex: number, lessonIndex: number) {
    this.clearVideoInterval();
    this.isPlaying = false;
    this.currentTime = 0;
    this.videoProgress = 0;
    this.quizActive = false;
    this.quizCompleted = false;

    this.activeSectionIndex = sectionIndex;
    this.activeLessonIndex = lessonIndex;
    this.activeLesson = this.sections[sectionIndex].lessons[lessonIndex];
  }

  togglePlay() {
    if (this.activeLesson.type !== 'video') return;

    if (this.isPlaying) {
      this.clearVideoInterval();
      this.isPlaying = false;
    } else {
      this.isPlaying = true;
      this.videoInterval = setInterval(() => {
        if (this.currentTime < this.activeLesson.durationSeconds) {
          this.currentTime += 1;
          this.videoProgress = (this.currentTime / this.activeLesson.durationSeconds) * 100;
        } else {
          this.clearVideoInterval();
          this.isPlaying = false;
          this.currentTime = 0;
          this.videoProgress = 0;
          this.showToast('Video selesai diputar!');
        }
      }, 1000);
    }
  }

  clearVideoInterval() {
    if (this.videoInterval) {
      clearInterval(this.videoInterval);
      this.videoInterval = null;
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Quiz methods
  startQuiz() {
    this.quizActive = true;
    this.currentQuestionIndex = 0;
    this.selectedAnswerIndex = -1;
    this.quizCompleted = false;
    this.quizScore = 0;
  }

  selectAnswer(index: number) {
    this.selectedAnswerIndex = index;
  }

  submitAnswer() {
    if (this.selectedAnswerIndex === -1) {
      this.showToast('Pilih salah satu jawaban terlebih dahulu!');
      return;
    }

    const currentQuestion = this.quizQuestions[this.currentQuestionIndex];
    if (this.selectedAnswerIndex === currentQuestion.correctIndex) {
      this.quizScore += 1;
    }

    if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
      this.currentQuestionIndex += 1;
      this.selectedAnswerIndex = -1;
    } else {
      this.quizCompleted = true;
    }
  }

  closeQuiz() {
    this.quizActive = false;
  }

  restartQuiz() {
    this.startQuiz();
  }

  goToNextLesson() {
    this.quizActive = false;
    this.quizCompleted = false;

    let nextLessonIndex = this.activeLessonIndex + 1;
    let nextSectionIndex = this.activeSectionIndex;

    if (nextLessonIndex >= this.sections[nextSectionIndex].lessons.length) {
      nextLessonIndex = 0;
      nextSectionIndex += 1;
    }

    if (nextSectionIndex < this.sections.length) {
      this.selectLesson(nextSectionIndex, nextLessonIndex);
      this.showToast(`Lanjut ke Pelajaran ${nextLessonIndex + 1}`);
    } else {
      this.showToast('Selamat! Anda telah menyelesaikan semua materi di course ini.');
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'dark',
      position: 'bottom'
    });
    await toast.present();
  }
}
