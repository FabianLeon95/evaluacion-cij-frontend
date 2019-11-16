import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Question} from '../../../../models/question.model';
import {QuestionService} from '../../../../services/question.service';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styles: []
})
export class QuestionEditComponent implements OnInit {
  private form: FormGroup;
  private question: Question;

  constructor(private questionService: QuestionService, private route: ActivatedRoute) {
    this.form = new FormGroup({
      statement: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.questionService.get(params.id).subscribe((resp: any) => {
        this.question = resp;
        this.form.controls.statement.setValue(this.question.statement);
        this.form.controls.type.setValue(this.question.type);
      });
    });
  }

  update() {
    if (this.form.valid) {
      this.questionService.update(this.question.id, this.form.value)
        .subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: '¡Edición exitosa!',
          text: 'La pregunta se editó correctamente',
        });
      });
    }
  }

}
