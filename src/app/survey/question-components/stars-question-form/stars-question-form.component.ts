import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {AnswerService} from '../../../services/answer.service';
import {SpeechService} from '../../../services/speech.service';

@Component({
  selector: 'app-stars-question-form',
  templateUrl: './stars-question-form.component.html',
  styleUrls: ['../../club-survey/club-survey.component.scss', './stars-question-form.component.scss']
})
export class StarsQuestionFormComponent implements OnDestroy {

  @Input() clubId: number;
  @Input() question: Question;
  @Output() onAction: EventEmitter<boolean>;
  form: FormGroup;

  constructor(private answerService: AnswerService, private speechService: SpeechService) {
    this.onAction = new EventEmitter<boolean>();
    this.form = new FormGroup({
      stars: new FormControl('', [Validators.required])
    });
  }

  sendAnswer() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('club_id', this.clubId.toString());
      formData.append('question_id', this.question.id.toString());
      formData.append('stars', this.form.controls.stars.value);
      this.answerService.store(formData).subscribe((resp: any) => {
        this.form.reset();
        this.onAction.emit(true);
      });
    }
  }

  speak(text: string) {
    this.speechService.speak(text);
  }

  ngOnDestroy() {
    this.speechService.stop();
  }

}
