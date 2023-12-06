import { Component, OnInit } from '@angular/core';
import { ISong } from '@modules/songs/interfaces/song.interface';
import { SongService } from '@modules/songs/services/songs.service';
import { TrackService } from '@modules/tracks/services/track.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  listResults: ISong[] = [];

  constructor(private trackService: SongService) { }

  ngOnInit(): void {
  }

  receiveData(event: string): void {
    this.trackService.searchTracks(event)
      .subscribe(responseOk => {
        this.listResults = responseOk;
      }, error => {
        this.listResults = [];
      })
  }
}
