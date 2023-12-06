import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INewSong, ISong } from '../interfaces/song.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private readonly URL = environment.api
  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  sendCredentials(newSong: INewSong): Observable<any> {
    const body = new FormData();
    body.append('nombre', newSong.nombre);
    body.append('imagen', newSong.imagen as File, 'imagen');
    body.append('album', newSong.album);
    body.append('genero', newSong.genero);
    body.append('cancion', newSong.cancion as File, 'cancion');
    body.append('isPrivado', newSong.isPrivado.toString());
    body.append('idioma', newSong.idioma);

    return this.http.post(`${this.URL}/canciones`, body)
  }

  getSongs(id: string): Observable<any> {
    return this.http.get(`${this.URL}/canciones/by/usuario.id/${id}`)
  }

  getAllTracks(): Observable<ISong[]> {
    const options = {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    }
    return this.http.get<ISong[]>(`${this.URL}/canciones?limit=8`, options);
  }

  getAllTracksRecommended(): Observable<ISong[]> {
    const options = {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    }
    return this.http.get<ISong[]>(`${this.URL}/canciones?limit=4`, options);
  }

  searchTracks(event: string): Observable<ISong[]> {
    const options = {
      headers: { Authorization: `Bearer ${this.cookie.get('token')}` }
    }
    return this.http.get<ISong[]>(`${this.URL}/canciones/search/nombre/${event}`, options);
  }
}
