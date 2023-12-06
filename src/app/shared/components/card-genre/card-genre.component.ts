import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGenre } from '@modules/songs/interfaces/genre.interface';

@Component({
  selector: 'app-card-genre',
  templateUrl: './card-genre.component.html',
  styleUrls: ['./card-genre.component.css']
})
export class CardGenreComponent {
  @Input() genre: IGenre | undefined;
  @Output() genreSelected = new EventEmitter<any>();

  constructor() { }

  selectGenre(genre: any) {
    this.genreSelected.emit(genre);
  }
}
