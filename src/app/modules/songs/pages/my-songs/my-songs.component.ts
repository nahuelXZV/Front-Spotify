import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@modules/auth/interfaces/auth.interface';
import { ISong } from '@modules/songs/interfaces/song.interface';
import { AlbumService } from '@modules/songs/services/album.service';
import { SongService } from '@modules/songs/services/songs.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['./my-songs.component.css']
})
export class MySongsComponent implements OnInit{

  openAlbumModal: boolean = false;
  openGeneroModal: boolean = false;

  currentUser: IUser | null = null

  songs: ISong[] = []

  constructor(
    private router: Router,
    private albumService: AlbumService,
    private songService: SongService,
    private stateService: StateService
    ) {

  }
  ngOnInit(): void {
    this.stateService.currentUser$.subscribe(user => {
      this.currentUser = user
    })

    this.getSongs();
  }


  openAddSongPage() {
    this.router.navigate(['/', 'songs', 'add']);
  }


  handleAlbumButtonClick() {
    this.openAlbumModal = true;
  }

  handleSubmitAlbumForm($event: { nombre: string, imagen: File }) {
    console.log('handleSubmitAlbumForm');

    console.log($event);
    this.albumService.sendCredentials($event)
      .subscribe(album => {
          // console.log(album);
      },
        err => {
          console.log(err);
        }
      )
  }


  handleGenreButtonClick() {
    this.openGeneroModal = true;
  }

  private getSongs() {
    this.songService.getSongs(this.currentUser?.id as string)
      .subscribe(songs => {
        this.songs = songs
      },
        err => {
          console.log(err);
        }
      )
  }

  handleViewAlbumsButtonClick() {
    this.router.navigate(['/', 'songs','albums']);
  }
}
