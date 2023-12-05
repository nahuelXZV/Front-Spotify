import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IGenre } from '@core/models/genre.interface';
import { IUser } from '@modules/auth/interfaces/auth.interface';
import { IAlbum } from '@modules/songs/interfaces/album.interface';
import { AlbumService } from '@modules/songs/services/album.service';
import { GenreService } from '@modules/songs/services/genre.service';
import { SongService } from '@modules/songs/services/songs.service';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

  public formSong: FormGroup = new FormGroup({})
  currentUser: IUser | null = null
  albums: IAlbum[] = []
  genres: IGenre[] = []

  constructor(
    private songService: SongService,
    private genreService: GenreService,
    private albumService: AlbumService,
    private router: Router,
    private stateService: StateService,
  ) { }

  ngOnInit(): void {
    this.stateService.currentUser$.subscribe(user => {
      this.currentUser = user
    })
    this.formSong = new FormGroup({
      imagen: new FormControl(''),
      cancion: new FormControl(''),
      nombre: new FormControl(''),
      isPrivado: new FormControl('false'),
      genero: new FormControl('no-value'),
      album: new FormControl('no-value'),
      idioma: new FormControl('no-value'),
    })
    this.getAlbums()
    this.getGenres()
  }

  sendSong() {

    console.log(this.formSong.value);
    const newSong = this.formSong.value
    this.songService.sendCredentials(newSong)
      //TODO: 200 <400
      .subscribe(responseOk => { //TODO: Cuando el usuario credenciales Correctas ✔✔
        console.log('song added succesful', responseOk);
        this.router.navigate(['/', 'songs'])
      },
        err => {//TODO error 400>=

          console.log('⚠⚠⚠⚠Ocurrio error con tu email o password', err);
        })

  }

  backToMySongs() {
    this.router.navigate(['/', 'songs'])
  }

  onUploadSuccess(event: any) {
    console.log('onUploadSuccess', event);
    const file = event[1].files.file
    console.log('file', file);

    this.formSong.patchValue({
      imagen: file
    })
  }


  getGenres() {
    this.genreService.getGenres()
      .subscribe(genres => {
        this.genres = genres
      },
      err => {
        console.log(err);
      }
      )
  }

  getAlbums() {
    this.albumService.getAlbumsby(this.currentUser?.id as string)
      .subscribe(albums => {
        this.albums = albums
      },
        err => {
          console.log(err);
        }
      )
  }

  handleChangeImage($event: {imagen: File}) {
    console.log('handleChangeImage', $event.imagen);

    this.formSong.patchValue({
      imagen: $event.imagen
    })
  }

  handleChangeSong($event: Event) {
    const file = ($event.target as HTMLInputElement).files?.[0]
    console.log('handleChangeSong', file);

    this.formSong.patchValue({
      cancion: file
    })
  }
}
