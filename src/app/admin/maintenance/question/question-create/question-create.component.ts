import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../../../services/question.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styles: []
})
export class QuestionCreateComponent {
  private form: FormGroup;

  constructor(private questionService: QuestionService, private router: Router) {
    this.form = new FormGroup({
      statement: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }

  store() {
    if (this.form.valid) {
      this.questionService.store(this.form.value)
        .subscribe(resp => {
          Swal.fire({
            icon: 'success',
            title: '¡Creación exitosa!',
            text: 'La pregunta se creó correctamente',
          }).then(() => {
            this.router.navigate(['/admin/questions']);
          });
        });
    }
  }
}
