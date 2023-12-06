import { Component, OnInit } from '@angular/core';
import { ISong } from '@modules/songs/interfaces/song.interface';
import { SongService } from '@modules/songs/services/songs.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  listResults: ISong[] = [];

  constructor(private songService: SongService) { }

  ngOnInit(): void {
  }

  receiveData(event: string): void {
    this.songService.searchTracks(event).toPromise().then((data: ISong[]) => {
      this.listResults = data;
      console.log(this.listResults);
    }).catch((error) => {
      console.log(error);
    })

  }
}
