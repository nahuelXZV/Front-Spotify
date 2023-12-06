import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from '@modules/auth/pages/profile-page/profile-page.component';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'tracks',
    loadChildren: () => import('@modules/tracks/tracks.module').then(m => m.TracksModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('@modules/favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: 'history',
    loadChildren: () => import('@modules/history/history.module').then(m => m.HistoryModule)
  },
  {
    path: 'songs',
    loadChildren: () => import('@modules/songs/songs.module').then(m => m.SongsModule)
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: '**',//TODO 404 cuando no existe la ruta
    redirectTo: '/tracks'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
