import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IRegister {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api

  constructor(
    private http: HttpClient
  ) { }

  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    }
    return this.http.post(`${this.URL}/login`, body)
  }


  registerUser(register: IRegister): Observable<any> {
    const body = {
      nombre: register.nombre,
      apellido: register.apellido,
      email: register.email,
      password: register.password,
      role: 'basic'
    }
    return this.http.post(`${this.URL}/user`, body)
  }

}
