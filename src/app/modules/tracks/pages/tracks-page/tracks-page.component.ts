import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GenreService } from '@modules/dashboard/services/genre.service';
import { IUser } from '@modules/auth/interfaces/auth.interface';
import { UserService } from '@modules/dashboard/services/user.service';
import { ISong } from '@modules/songs/interfaces/song.interface';
import { SongService } from '@modules/songs/services/songs.service';
import { IGenre } from '@modules/songs/interfaces/genre.interface';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  genreList: IGenre[] = [];
  trackList: ISong[] = [];
  trackRecommended: ISong[] = [];
  listObservers$: Array<Subscription> = []
  user: IUser | null = null

  constructor(
    private songService: SongService,
    private genreService: GenreService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadDataAll() //TODO 📌📌
  }

  async loadDataAll(): Promise<any> {
    this.trackList = await this.songService.getAllTracks().toPromise()
    this.genreList = await this.genreService.getGenres().toPromise()
    this.user = await this.userService.getUserAuth().toPromise()
    this.trackRecommended = [...this.trackList].reverse()
  }

  ngOnDestroy(): void { }

}
