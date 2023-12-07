import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISong } from '@modules/songs/interfaces/song.interface';
import { Version } from '@modules/songs/interfaces/version.interface';
import { SongService } from '@modules/songs/services/songs.service';
import { VersionService } from '@modules/songs/services/version.service';

@Component({
  selector: 'app-song-subir',
  templateUrl: './song-subir.component.html',
  styleUrls: ['./song-subir.component.css']
})
export class SongSubirComponent implements OnInit {

  song!: ISong;
  version!: Version;
  public formSong: FormGroup = new FormGroup({})

  constructor(
    private songService: SongService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private versionService: VersionService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    const idioma = this.activatedRoute.snapshot.paramMap.get('idioma') || '';

    this.formSong = new FormGroup({
      cancion: new FormControl(''),
      estado_traduccion: new FormControl(''),
    })
    this.versionService.getOneVersion(id, idioma).subscribe(version => {
      this.version = version
      console.log('version', this.version);
      this.songService.getSong(this.version.cancion.id)
        .subscribe(song => {
          this.song = song
          console.log('song', this.song);
        })
    })

  }

  sendSong() {
    const cancion = this.formSong.value.cancion
    const estado_traduccion = this.formSong.value.estado_traduccion
    console.log('sendSong', cancion, estado_traduccion);
    this.versionService.updateVersion(this.version.id, cancion, estado_traduccion).subscribe(responseOk => {
      console.log('song updated succesful', responseOk);
      this.router.navigate(['/', 'admin/song/' + this.song.id])
    })
  }

  backToMySongs() {
    this.router.navigate(['/', '../'])
  }

  handleChangeSong($event: Event) {
    const file = ($event.target as HTMLInputElement).files?.[0]
    console.log('handleChangeSong', file);
    this.formSong.patchValue({
      cancion: file
    })
  }
}
