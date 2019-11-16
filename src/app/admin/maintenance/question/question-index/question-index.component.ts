import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-index',
  templateUrl: './question-index.component.html',
  styles: []
})
export class QuestionIndexComponent implements OnInit {
  private questions: any[];
  private loading: boolean;
  constructor(private questionService: QuestionService) {
    this.loading = true;
  }

  ngOnInit() {
    this.questionService.all().subscribe((resp: any) => {
      this.questions = resp;
      this.loading = false;
    });
  }

  typeToString(type: string) {
    switch (type) {
      case 'stars':
        return 'Estrellas';
      case 'yesNo':
        return 'Si/No';
      case 'text':
        return 'Texto';
    }
  }

  delete(id: any) {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea borrar la pregunta?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deleteQuestion(id);
      }
    });
  }

  private deleteQuestion(id: any) {
    this.questionService.delete(id)
      .subscribe((resp: any) => {
        Swal.fire(
          '¡Eliminación exitosa!',
          'La pregunta se eliminó correctamente.',
          'success'
        );
        this.questions = this.questions.filter(q => q.id !== id);
      });
  }

}
