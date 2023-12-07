import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { GenresComponent } from './pages/genres/genres.component';
import { SongsComponent } from './pages/songs/songs.component';
import { SongComponent } from './pages/song/song.component';
import { SongSubirComponent } from './pages/song-subir/song-subir.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'genres',
    component: GenresComponent
  },
  {
    path: 'songs',
    component: SongsComponent
  },
  {
    path: 'song/:id',
    component: SongComponent
  },
  {
    path: 'song/:id/:idioma',
    component: SongSubirComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRutingModule { }
