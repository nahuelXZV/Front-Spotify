import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INewAlbum } from '../interfaces/album.interface';


@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    private readonly URL = environment.api
    constructor(private http: HttpClient) { }

    sendCredentials(newAlbum: INewAlbum): Observable<any> {
        const body = new FormData();
        body.append('nombre', newAlbum.nombre);
        body.append('imagen', newAlbum.imagen as File, 'imagen');

        return this.http.post(`${this.URL}/album`, body)
    }

    getAlbumsby(id: string): Observable<any> {
        return this.http.get(`${this.URL}/album/by/usuario.id/${id}`)
    }

    getAlbums(): Observable<any> {
        const params = new HttpParams();
        params.append('offset', '0');
        params.append('limit', '10');
        return this.http.get(`${this.URL}/album`, { params })
    }

    updateAlbum(id: string, data: { imagen: File | null, nombre: string | null }): Observable<any> {
        const body = new FormData();
        data.nombre && body.append('nombre', data.nombre);
        data.imagen && body.append('imagen', data.imagen as File, 'imagen');

        return this.http.patch(`${this.URL}/album/${id}`, body)
    }
}
