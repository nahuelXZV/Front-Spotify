import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drop-zone-image',
  templateUrl: './drop-zone-image.component.html',
  styleUrls: ['./drop-zone-image.component.css']
})
export class DropZoneImageComponent {
  @ViewChild('labelInputFile') fileInput!: ElementRef<HTMLElement>;
  @ViewChild('dropZone') dropZone!: ElementRef<HTMLElement>;
  @ViewChild('imageZone') imageZone!: ElementRef<HTMLInputElement>;
  @ViewChild('inputElementFile') inputElementFile!: ElementRef<HTMLInputElement>;

  @Input() width: string = '360px';
  @Input() height: string = '360px';

  @Output() changeImage = new EventEmitter<{ imagen: File }>();


  onEnter(_: any) {
    this.fileInput.nativeElement.classList.add('active');
  }

  onLeave($event: any) {
    if ($event.target.tagName === 'LABEL') return;
    this.fileInput.nativeElement.classList.remove('active');
  }

  handleDragOver($event: any) {
    $event.preventDefault();
  }

  handleDrop($event: any) {
    console.log('handleDrop');
    $event.preventDefault();

    this.fileInput.nativeElement.classList.remove('active');
    this.dropZone.nativeElement.style.display = 'none';
    this.imageZone.nativeElement.style.display = 'block';

    const files = $event.dataTransfer.files;

    this.inputElementFile.nativeElement.files = files;
    this.inputElementFile.nativeElement.dispatchEvent(new Event('change'));
  }


  onFileSelected($event: any) {
    this.fileInput.nativeElement.classList.remove('active');
    this.dropZone.nativeElement.style.display = 'none';
    this.imageZone.nativeElement.style.display = 'block';

    const file = $event.target.files[0];

    if (!file) return;

    if (file.type.startsWith('image')) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageZone.nativeElement.src = fileReader.result as string;
      };

      fileReader.readAsDataURL(file);
      console.log('emmite');

      this.changeImage.emit({ imagen: file });
    }

  }

}
