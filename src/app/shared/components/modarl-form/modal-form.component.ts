// modal-form.component.ts
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent implements OnInit {
  @ViewChild('labelInputFile') fileInput!: ElementRef<HTMLElement>;
  @ViewChild('dropZone') dropZone!: ElementRef<HTMLElement>;
  @ViewChild('imageZone') imageZone!: ElementRef<HTMLInputElement>;
  @ViewChild('inputElementFile') inputElementFile!: ElementRef<HTMLInputElement>;

  @Input() title: string = '';
  @Input() open: boolean = false;
  @Input() buttonLabel: string = 'Crear';
  @Input() data: {imagen: string, nombre: string } | null = null

  @Output() create = new EventEmitter<{ imagen: File, nombre: string }>();
  @Output() close = new EventEmitter<void>();

  // nombre: string = '';
  // imagen: File | null = null;

  // onFileSelected(event: any) {
  //   this.imagen = event.target.files[0];
  // }

  public form: FormGroup = new FormGroup({})
  public isError: boolean = false;


  ngOnInit(): void {
    this.form = new FormGroup({
      imagen: new FormControl(null),
      nombre: new FormControl(''),
    })

    if(this.data) {
      this.form.patchValue({nombre: this.data.nombre});
    }
  }


  handleSubmit() {
    if (this.form.valid) {
      // this.create.emit({ imagen: this.inputElementFile.nativeElement.files![0], nombre: this.form.value.nombre });
      this.create.emit(this.form.value);
      this.close.emit();
    }
    this.isError = true;
  }

  cancelar() {
    this.close.emit();
  }


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

    // Prevent default behavior (Prevent file from being opened)
    $event.preventDefault();

    // Add class to html element
    this.fileInput.nativeElement.classList.remove('active');
    this.dropZone.nativeElement.style.display = 'none';
    this.imageZone.nativeElement.style.display = 'block';

    // Get file from event dataTransfer
    const files = $event.dataTransfer.files;

    // Check if file is an image
    this.inputElementFile.nativeElement.files = files;
    this.inputElementFile.nativeElement.dispatchEvent(new Event('change'));
  }


  onFileSelected($event: any) {
    this.fileInput.nativeElement.classList.remove('active');
    this.dropZone.nativeElement.style.display = 'none';
    this.imageZone.nativeElement.style.display = 'block';

    // Get file from event dataTransfer
    const file = $event.target.files[0];

    this.form.patchValue({
      imagen: file
    })


    if (!file) return;

    // Check if file is an image
    if (file.type.startsWith('image')) {
      // Create a new FileReader
      const fileReader = new FileReader();

      // Add event listener
      fileReader.onload = () => {

        // Set image to src
        this.imageZone.nativeElement.src = fileReader.result as string;


      };

      // Read file as data url
      fileReader.readAsDataURL(file);
    }

  }


}
