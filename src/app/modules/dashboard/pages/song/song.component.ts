import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISong } from '@modules/songs/interfaces/song.interface';
import { Version } from '@modules/songs/interfaces/version.interface';
import { SongService } from '@modules/songs/services/songs.service';
import { VersionService } from '@modules/songs/services/version.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  song!: ISong;
  versiones!: Version[];

  constructor(
    private songService: SongService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private versionService: VersionService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.songService.getSong(id)
      .subscribe(song => {
        this.song = song
        this.getVersiones()
      })
  }

  getVersiones() {
    this.versionService.getVersion(this.song.id)
      .subscribe(versions => {
        console.log(versions)
        this.versiones = versions
      })
  }

  ver(id: string) {
    this.router.navigate([`/admin/song/${id}`])
  }

  subir(id: string, idioma: string) {
    this.router.navigate([`/admin/song/${id}/${idioma}`])
  }

  descargar(cancion: string) {
    this.songService.downloadSong(cancion)
      .subscribe(response => {
        console.log(response)
        const url = window.URL.createObjectURL(response)
        window.open(url)
      })

  }
}
