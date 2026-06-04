import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VideoMateriPageRoutingModule } from './video-materi-routing.module';
import { VideoMateriPage } from './video-materi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoMateriPageRoutingModule,
    VideoMateriPage
  ]
})
export class VideoMateriPageModule {}
