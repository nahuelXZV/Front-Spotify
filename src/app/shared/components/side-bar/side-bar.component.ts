import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@modules/auth/interfaces/auth.interface';
import { UserService } from '@modules/dashboard/services/user.service';
import { ISong } from '@modules/songs/interfaces/song.interface';
import { SongService } from '@modules/songs/services/songs.service';
import { CookieService } from 'ngx-cookie-service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }

  customOptions: Array<any> = []
  listTrackRecommended: ISong[] = []
  user!: IUser;

  constructor(
    private router: Router,
    private songService: SongService,
    private userService: UserService,
    private stateService: StateService,
    private cokie: CookieService
  ) { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Admin',
        icon: 'uil uil-dashboard',
        router: ['/', 'admin']
      },
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'tracks']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites'],
        query: { hola: 'mundo' }
      },
      {
        name: 'Mis canciones',
        icon: 'uil uil-music',
        router: ['/', 'songs'],
      }
    ]

    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      }
    ]

    this.customOptions = [
      {
        name: 'Mi lista º1',
        router: ['/']
      },
      {
        name: 'Mi lista º2',
        router: ['/']
      },
      {
        name: 'Mi lista º3',
        router: ['/']
      },
      {
        name: 'Mi lista º4',
        router: ['/']
      }
    ]
    this.songService.getAllTracksRecommended().subscribe((data: any) => {
      this.listTrackRecommended = [...data].reverse()
    })
    this.userService.getUserAuth().subscribe((user: IUser) => {
      this.user = user
    })
    if (this.user.role != 'admin') {
      this.mainMenu.defaultOptions.splice(0, 1);
    }
  }


  goTo($event: any): void {
    this.router.navigate(['/', 'favorites'], {
      queryParams: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3'
      }
    })
    console.log($event)
  }

  handleLogout(): void {
    this.stateService.clearCurrentUser();
    this.cokie.delete('token');
    this.router.navigate(['/', 'auth', 'login']);
  }
}
