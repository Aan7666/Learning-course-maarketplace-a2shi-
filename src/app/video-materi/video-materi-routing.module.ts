import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoMateriPage } from './video-materi.page';

const routes: Routes = [
  {
    path: '',
    component: VideoMateriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoMateriPageRoutingModule {}
