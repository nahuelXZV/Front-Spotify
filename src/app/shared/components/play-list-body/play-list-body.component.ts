import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { ISong } from '@modules/songs/interfaces/song.interface';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface SongModel extends ISong {
  versions: any[]
  versionSelected?: any
}
@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit {
  @Input() tracks: ISong[] = []
  optionSort: { property: string | null, order: string } = { property: null, order: 'asc' }
  songSelected: SongModel | null = null
  track = null
  idioma = "es"
  private readonly URL = environment.api


  constructor(private multimediaService: MultimediaService, private http: HttpClient) { }

  ngOnInit(): void {

  }

  changeSort(property: string): void {
    const { order } = this.optionSort
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }
    console.log(this.optionSort);

  }

  getSong(song: ISong): void {
    console.log("file file");
    this.songSelected = song as SongModel

    this.getVersions(song.id).subscribe((response: any) => {
      if (this.songSelected) {
        this.songSelected.versions = []
        const versions = response
        versions.forEach((version: any) => {
          this.songSelected?.versions.push({
            id: version.id,
            idioma: version.idioma,
            url: version.url_cancion,
            letra: version.letra
          })
        })


        this.songSelected.versionSelected = this.getVersionbyIdioma(this.songSelected.versions, this.idioma)
        console.log(this.songSelected);


        const version = this.songSelected.versionSelected


        const restUrl = version.url
        const cover = song.imagen

        const track: TrackModel = {
          name: song.nombre,
          album: song.album.nombre,
          cover: cover,
          _id: song.id,
          url: restUrl,
          artist: song.usuario.nombre,
          lyrics: version.letra
        }
        console.log(this.songSelected);

        this.multimediaService.setAudio(track, this.idioma, this.songSelected.versions)
      }
    },
      err => console.log(err)
    )
  }

  private getVersions(id: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache'
      })
    };
    return this.http.get(`${this.URL}/version/${id}/all`, options)
  }

  getVersionbyIdioma(versions: any[], idioma: string) {
    console.log(versions, idioma);

    return versions.find((version: any) => version.idioma === idioma)
  }

  getIdiomas() {
    const idiomas = this.songSelected?.versions.map((version: any) => version.idioma)
    return idiomas
  }
}
