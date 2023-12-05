import { Component, OnInit } from '@angular/core';
import { IGenre } from '@core/models/genre.interface';
import { GenreService } from '@modules/dashboard/services/genre.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genreToView: { imagen: string, nombre: string } | null = null;
  genreToEdit: IGenre | null = null;

  genres: IGenre[] = [];
  openCreateGenreModal: boolean = false;

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  handleOpenCreateGenreModalButton() {
    this.openCreateGenreModal = true;
  }

  private getGenres() {
    this.genreService.getGenres()
      .subscribe(genres => {
        this.genres = genres;
      },
        err => {
          console.log(err);
        }
      )
  }


  viewGenre(id: string) {
    if (id === '') return;

    if (this.genres.length === 0) return;

    const { imagen, nombre } = this.genres.find(genre => genre.id === id)!;

    this.genreToView = { imagen, nombre };
  }

  editGenre(id: string) {
    if (id === '') return;

    if (this.genres.length === 0) return;

    const genreFound = this.genres.find(genre => genre.id === id)!;
    this.genreToEdit = genreFound;
  }

  deleteGenre(id: string) {
    if (id === '') return;

    if (this.genres.length === 0) return;

    this.genreService.deleteGenre(id)
      .subscribe(response => {
        console.log(response);
        this.genres = [];
        this.getGenres();
      }, err => { console.log(err) })
  }

  handleUpdateGenreForm($event: { imagen: File, nombre: string }) {
    console.log('handleUpdateGenreForm');
    console.log($event);

    const { id, nombre } = this.genreToEdit!;
    const data: { imagen: File | null, nombre: string | null } = { imagen: $event.imagen, nombre: $event.nombre };
    if (data.nombre === nombre) {
      data.nombre = null;
    }

    this.genreService.updateGenre(id, data)
      .subscribe(genre => {
        console.log(genre);
        this.genreToEdit = null;
        this.genres = [];
        this.getGenres();
      }, err => { console.log(err) })
  }

  handleSubmitCreateGenre(event: {imagen: File, nombre: string}) {

    this.genreService.sendCredentials(event)
      .subscribe(response => {
        console.log(response);
        this.openCreateGenreModal = false;
        this.genres = [];
        this.getGenres();
      }, err => { console.log(err) })
  }
}
