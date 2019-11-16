import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClubService} from '../../../../services/club.service';
import {handleInvalidFileType} from '../../../../helpers/errors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.component.html',
  styles: []
})
export class ClubCreateComponent {
  private form: FormGroup;
  private previewImgUri: string;
  private noImageUri = '/assets/images/no-image.png';
  @ViewChild('fileLabel', {static: false})
  private fileLabel: ElementRef;

  constructor(private clubService: ClubService) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });
    this.previewImgUri = this.noImageUri;
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) { // Comprueba que se cargo un archivo
      const file = event.target.files[0];
      if (file.type.match(/image\/*/) == null) { // Verifica que sea una imagen
        handleInvalidFileType();
        return;
      }
      this.form.patchValue({image: file}); // Asigna la imagen al formulario
      this.setImgUrl(file);
      this.setFileLabel(file);
    }
  }

  store(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('image', this.form.controls.image.value, this.form.controls.image.value.name);
      formData.append('name', this.form.controls.name.value);
      this.clubService.store(formData).subscribe(_ => {
        Swal.fire({
          icon: 'success',
          title: '¡Creación exitosa!',
          text: 'El club se creó correctamente',
        });
        this.form.reset(); // Reseteo de formulario
        this.setImgUrl();
        this.setFileLabel();
      });
    }
  }

  private setImgUrl(file?: any): void {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewImgUri = reader.result as string; // Asigna el url del preview de la imagen
      };
    }
    this.previewImgUri = this.noImageUri;
  }

  private setFileLabel(file?: any): void {
    this.fileLabel.nativeElement.innerText = (file) ?
      (file.name.length > 50) ? file.name.substr(0, 49) + '...' : file.name :
      'Elegir imagen';
  }
}
