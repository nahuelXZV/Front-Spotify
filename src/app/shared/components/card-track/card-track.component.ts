import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISong } from '@modules/songs/interfaces/song.interface';

@Component({
  selector: 'app-card-track',
  templateUrl: './card-track.component.html',
  styleUrls: ['./card-track.component.css']
})
export class CardTrackComponent implements OnInit {
  @Input() track!: ISong;
  @Output() genreSelected = new EventEmitter<any>();
  artistaName: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.artistaName = this.track?.usuario?.nombre + ' ' + this.track?.usuario?.apellido;
    if (this.artistaName === 'undefined undefined') {
      this.artistaName = 'Anónimo'
    }
  }

  selectGenre(track: any) {
    this.genreSelected.emit(track);
  }
}
