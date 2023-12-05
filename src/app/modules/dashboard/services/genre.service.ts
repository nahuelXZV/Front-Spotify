import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGenre } from '@core/models/genre.interface';
import { INewGenre } from '@modules/songs/interfaces/genre.interface';
import { Observable } from 'rxjs';

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

    updateGenre(id: string, data: { imagen: File | null, nombre: string | null }): Observable<IGenre> {
        console.log('updateGenre');
        console.log(data);

        const dataToEdit = new FormData();
        data.nombre && dataToEdit.append('nombre', data.nombre);
        data.imagen && dataToEdit.append('imagen', data.imagen);

        return this.http.patch<IGenre>(`${this.URL}/genero/${id}`, dataToEdit)
    }

    sendCredentials(newGenre: INewGenre): Observable<any> {
        const body = new FormData();
        body.append('nombre', newGenre.nombre);
        body.append('imagen', newGenre.imagen as File, 'imagen');

        console.log(newGenre);

        console.log(body.get('nombre'), body.get('imagen'));


        return this.http.post(`${this.URL}/genero`, body)
    }

    deleteGenre(id: string): Observable<any> {
        return this.http.delete(`${this.URL}/genero/${id}`)
    }
}
