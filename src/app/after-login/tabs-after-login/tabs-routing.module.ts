import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home-after-login/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search-after-login/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('../courses-after-login/courses.module').then(m => m.CoursesPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile-after-login/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'wishlist',
        loadChildren: () => import('../wishlist-after-login/wishlist.module').then(m => m.WishlistPageModule)
      },
      {
        // Default redirect jika user hanya mengetik /tabs
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }