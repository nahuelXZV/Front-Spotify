import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISong } from '@modules/songs/interfaces/song.interface';
import { SongService } from '@modules/songs/services/songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs: ISong[] = []

  constructor(
    private songService: SongService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.songService.getAllTracks()
      .subscribe(songs => {
        this.songs = songs
      })
  }

  ver(id: string) {
    this.router.navigate([`/admin/song/${id}`])
  }
}
