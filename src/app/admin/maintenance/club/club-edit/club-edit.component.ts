import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ClubService} from '../../../../services/club.service';
import {Club} from '../../../../models/club.model';
import {environment} from '../../../../../environments/environment';
import {handleInvalidFileType} from '../../../../helpers/errors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-club-edit',
  templateUrl: './club-edit.component.html',
  styles: []
})
export class ClubEditComponent implements OnInit {
  private club: Club;
  private form: FormGroup;
  private previewImgUri: string;
  @ViewChild('fileLabel', {static: false})
  private fileLabel: ElementRef;

  constructor(private clubService: ClubService, private route: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.clubService.get(params.id).subscribe((resp: any) => {
        this.club = resp;
        this.form.controls.name.setValue(this.club.name);
        this.previewImgUri = environment.apiUrl + this.club.imgPath;
      });
    });
  }

  onFileChange(event) { // TODO: DRY
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

  update() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('name', this.form.get('name').value);
      if (this.form.controls.image.value) {
        formData.append('image', this.form.controls.image.value, this.form.controls.image.value.name);
      }
      this.clubService.update(this.club.id, formData).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: '¡Edición exitosa!',
          text: 'El club se editó correctamente',
        });
        // Reseteo de formulario
        this.form.reset();
        this.club = resp;
        this.form.controls.name.setValue(this.club.name);
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
  }

  private setFileLabel(file?: any): void {
    this.fileLabel.nativeElement.innerText = (file) ?
      (file.name.length > 50) ? file.name.substr(0, 49) + '...' : file.name :
      'Elegir imagen';
  }

}
