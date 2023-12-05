// state.service.ts
import { Injectable } from '@angular/core';
import { IUser } from '@modules/auth/interfaces/auth.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromLocalStorage();
  }

  private loadUserFromLocalStorage() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user: IUser = JSON.parse(storedUser);
      this.setCurrentUser(user);
    }
  }

  setCurrentUser(user: IUser) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearCurrentUser() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }
}
