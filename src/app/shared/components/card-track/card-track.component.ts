import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISong } from '@modules/songs/interfaces/song.interface';

@Component({
  selector: 'app-card-track',
  templateUrl: './card-track.component.html',
  styleUrls: ['./card-track.component.css']
})
export class CardTrackComponent {
  @Input() track!: ISong;
  @Output() genreSelected = new EventEmitter<any>();
  artistaName: string = '';

  constructor() {
    this.artistaName += this.track?.usuario?.nombre + ' ' + this.track?.usuario?.apellido;
  }

  selectGenre(track: any) {
    this.genreSelected.emit(track);
  }
}
