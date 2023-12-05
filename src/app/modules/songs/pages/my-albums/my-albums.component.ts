import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAlbum } from '@modules/songs/interfaces/album.interface';
import { AlbumService } from '@modules/songs/services/album.service';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {
  albumToView: { imagen: string, nombre: string } | null = null;
  albumToEdit: IAlbum | null = null;

  albums: IAlbum[] = [];
  openCreateAlbumModal: boolean = false;

  constructor(
    private albumService: AlbumService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getGenres();
  }

  handleOpenCreateGenreModalButton() {
    this.openCreateAlbumModal = true;
  }

  private getGenres() {
    this.albumService.getAlbums()
      .subscribe(albums => {
        this.albums = albums;
      },
        err => {
          console.log(err);
        }
      )
  }


  viewGenre(id: string) {
    if (id === '') return;

    if (this.albums.length === 0) return;

    const { imagen, nombre } = this.albums.find(album => album.id === id)!;

    this.albumToView = { imagen, nombre };
  }

  editGenre(id: string) {
    if (id === '') return;

    if (this.albums.length === 0) return;

    const genreFound = this.albums.find(album => album.id === id)!;
    this.albumToEdit = genreFound;
  }


  handleUpdateGenreForm($event: { imagen: File, nombre: string }) {
    console.log('handleUpdateGenreForm');
    console.log($event);

    const { id, nombre } = this.albumToEdit!;
    const data: { imagen: File | null, nombre: string | null } = { imagen: $event.imagen, nombre: $event.nombre };
    if (data.nombre === nombre) {
      data.nombre = null;
    }

    this.albumService.updateAlbum(id, data)
      .subscribe(album => {
        console.log(album);
        this.albumToEdit = null;
        this.albums = [];
        this.getGenres();
      }, err => { console.log(err) })
  }

  handleSubmitCreateGenre(event: { imagen: File, nombre: string }) {

    this.albumService.sendCredentials(event)
      .subscribe(response => {
        console.log(response);
        this.openCreateAlbumModal = false;
        this.albums = [];
        this.getGenres();
      }, err => { console.log(err) })
  }

  handleViewSongsButton(){
    this.router.navigate(['/', 'songs'])
  }
}
