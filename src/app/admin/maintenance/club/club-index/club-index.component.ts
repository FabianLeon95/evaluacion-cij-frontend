import {Component, OnInit} from '@angular/core';
import {ClubService} from '../../../../services/club.service';
import {Club} from '../../../../models/club.model';
import Swal from 'sweetalert2';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-club-index',
  templateUrl: './club-index.component.html',
  styles: []
})
export class ClubIndexComponent implements OnInit {
  clubs: Club[];
  loading: boolean;
  apiUrl: string;

  constructor(private clubService: ClubService) {
    this.loading = true;
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.clubService.all().subscribe((resp: any) => {
      this.clubs = resp;
      this.loading = false;
    });
  }

  delete(id: number) {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea borrar el club?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deleteClub(id);
      }
    });
  }

  private deleteClub(id: number) {
    this.clubService.delete(id).subscribe(_ => {
      Swal.fire({
        icon: 'success',
        title: '¡Eliminación exitosa!',
        text: 'El club se eliminó correctamente.'
      });
      this.clubs = this.clubs.filter(q => q.id !== id);
    });
  }

}
