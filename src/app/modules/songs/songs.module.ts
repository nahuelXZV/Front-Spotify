import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsRoutingModule } from './songs-routing.module';
import { MySongsComponent } from './pages/my-songs/my-songs.component';
import { SharedModule } from '@shared/shared.module';
import { AddSongComponent } from './pages/add-song/add-song.component';
import { ReactiveFormsModule } from '@angular/forms';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MyAlbumsComponent } from './pages/my-albums/my-albums.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   uploadMultiple: false,
   acceptedFiles: 'image/*'
 };


@NgModule({
  declarations: [
    MySongsComponent,
    AddSongComponent,
    MyAlbumsComponent
  ],
  imports: [
    CommonModule,
    SongsRoutingModule,
    SharedModule,
    DropzoneModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class SongsModule { }
