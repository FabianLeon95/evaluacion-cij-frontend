import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {Club} from '../../../models/club.model';
import {AnswerService} from '../../../services/answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styles: []
})
export class AnswerComponent implements OnInit {
  @Input() club: Club;
  @Input() question: Question;
  answers: any[];
  loading: boolean;

  constructor(private answerService: AnswerService) {
    this.loading = true;
  }

  ngOnInit() {
    this.answerService.getQuestionAnswers(this.club.id, this.question.id).subscribe((resp: any) => {
      this.answers = resp;
      this.loading = false;
/*
      console.log(`A. Question: ${this.question.id}`, this.answers);
*/
    });
  }

}
