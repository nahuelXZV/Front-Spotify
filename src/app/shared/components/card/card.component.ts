// card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() imageUrl: string | undefined;
  @Input() class: string | undefined;

  @Output() buttonClick = new EventEmitter<void>();

  // param event type html button event click
  handleButtonClick() {
    this.buttonClick.emit();
  }
}
