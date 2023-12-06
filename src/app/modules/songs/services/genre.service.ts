import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGenre, INewGenre } from '../interfaces/genre.interface';

@Injectable({
    providedIn: 'root'
})
export class GenreService {
    private readonly URL = environment.api
    constructor(private http: HttpClient) { }

    getGenres(): Observable<IGenre[]> {
        const options = {
            headers: new HttpHeaders({
                'Cache-Control': 'no-cache'
            })
        };
        return this.http.get<IGenre[]>(`${this.URL}/genero`, options)
    }

    sendCredentials(newGenre: INewGenre): Observable<any> {
        const body = new FormData();
        body.append('nombre', newGenre.nombre);
        body.append('imagen', newGenre.imagen as File, 'imagen');

        return this.http.post(`${this.URL}/genero`, body)
    }
}
