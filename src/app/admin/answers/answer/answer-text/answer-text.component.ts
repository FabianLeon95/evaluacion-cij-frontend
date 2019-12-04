import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Question} from '../../../../models/question.model';

@Component({
  selector: 'app-answer-text',
  templateUrl: './answer-text.component.html',
  styles: []
})
export class AnswerTextComponent implements OnInit {
  @Input() answers: any[];
  @Input() question: Question;
  textAnswers: string[];
  audioAnswers: string[];
  apiUrl: string;

  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.textAnswers = this.getTextAnswers();
    this.audioAnswers = this.getAudioAnswers();
  }

  private getTextAnswers() {
    return this.answers
      .filter((answer: any) => answer.text)
      .map((answer: any) => answer.text);
  }

  private getAudioAnswers() {
    return this.answers
      .filter((answer: any) => answer.audio_path)
      .map((answer: any) => answer.audio_path);
  }

}
