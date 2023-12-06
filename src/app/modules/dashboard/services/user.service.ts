import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@modules/auth/interfaces/auth.interface';
import { IRegister } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly URL = environment.api
  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.URL}/user`)
  }

  getUserAuth(): Observable<IUser> {
    return this.http.post<IUser>(`${this.URL}/checkToken`, {
      "token": this.cookie.get('token')
    })
  }

  updateUser(id: string, user: Partial<IRegister>): Observable<IUser> {
    return this.http.put<IUser>(`${this.URL}/user/${id}`, user,{
      headers: {
        "token": this.cookie.get('token')
      }
    })
  }

}
