import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { UsersComponent } from './pages/users/users.component';
import { GenresComponent } from './pages/genres/genres.component';
import { SongComponent } from './pages/song/song.component';
import { SongsComponent } from './pages/songs/songs.component';
import { SongSubirComponent } from './pages/song-subir/song-subir.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    GenresComponent,
    SongComponent,
    SongsComponent,
    SongSubirComponent
  ],
  imports: [
    CommonModule,
    DashboardRutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
