import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGenre, INewGenre } from '../interfaces/genre.interface';
import { Version } from '../interfaces/version.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private readonly URL = environment.api

  constructor(
    private http: HttpClient,
    private cokie: CookieService
  ) { }

  getVersion(id: String): Observable<Version[]> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cokie.get('token')}`
      })
    };
    return this.http.get<Version[]>(`${this.URL}/version/${id}/all`, options)
  }

  getOneVersion(id: String, idioma: string): Observable<Version> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cokie.get('token')}`
      })
    };
    return this.http.get<Version>(`${this.URL}/version/${id}/${idioma}`, options)
  }

  updateVersion(id: string, cancion: File, estado: string): Observable<Version> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cokie.get('token')}`
      })
    };
    const body = new FormData();
    body.append('cancion', cancion, 'cancion');
    return this.http.patch<Version>(`${this.URL}/version/${id}/${estado}`, body, options)
  }
}
