import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //TODO: Programacion reactiva!

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = []
  state: string = 'paused'
  idiomas: string[] = ['es', 'en', 'pt', 'fr', 'it', 'de']
  lyrics: string = ''
  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$
      .subscribe(status => this.state = status)
    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
    console.log('🔴🔴🔴🔴🔴🔴🔴 BOOM!');
  }


  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x //TODO: 1050 - x
    const percentageFromX = (clickX * 100) / width
    console.log(`Click(x): ${percentageFromX}`);
    this.multimediaService.seekAudio(percentageFromX)
  }

  handleIdiomButton(idioma: string): void {
    this.multimediaService.setIdioma(idioma)
    this.lyrics = this.multimediaService.getLyrics() ?? ""
  }

  handleLyricsButton(): void {
    const htmlElement: HTMLElement = document.getElementById('lyrics-card') as HTMLElement
    htmlElement.style.display = htmlElement.style.display === 'none' ? 'block' : 'none'
    if(this.lyrics === ''){
      this.lyrics = this.multimediaService.getLyrics() ?? ""
    }
  }

}
