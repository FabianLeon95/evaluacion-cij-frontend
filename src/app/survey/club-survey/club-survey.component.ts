import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Club} from '../../models/club.model';
import {ClubService} from '../../services/club.service';
import {environment} from '../../../environments/environment';
import {Question} from '../../models/question.model';
import {QuestionService} from '../../services/question.service';
import {SpeechService} from '../../services/speech.service';

@Component({
  selector: 'app-club-survey',
  templateUrl: './club-survey.component.html',
  styleUrls: ['./club-survey.component.scss']
})
export class ClubSurveyComponent implements OnInit, OnDestroy {
  club: Club;
  boolQuestions: Question[];
  starsQuestions: Question[];
  textQuestions: Question[];
  apiUrl: string;
  loading: boolean;
  started: boolean;
  finished: boolean;
  current: number;
  currentType: string;

  constructor(private clubService: ClubService, private questionService: QuestionService, private route: ActivatedRoute,
              private speechService: SpeechService) {
    this.loading = true;
    this.started = false;
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clubService.get(params.id).subscribe((resp: any) => {
        this.club = resp;
        this.loading = false;
      });
    });
    this.questionService.getByType('yesNo').subscribe((resp: any) => {
      this.boolQuestions = resp;
      this.current = 0;
      this.currentType = 'yesNo';
    });
    this.questionService.getByType('stars').subscribe((resp: any) => this.starsQuestions = resp);
    this.questionService.getByType('text').subscribe((resp: any) => this.textQuestions = resp);
  }

  start() {
    this.started = true;
    if (this.boolQuestions.length === 0) {
      this.next();
    }
    this.speechService.stop();
  }

  next() {
    this.current++;
    if (this.currentType === 'yesNo' && this.current >= this.boolQuestions.length) {
      this.currentType = 'stars';
      this.current = 0;
    }
    if (this.currentType === 'stars' && this.current >= this.starsQuestions.length) {
      this.currentType = 'text';
      this.current = 0;
    }
    if (this.currentType === 'text' && this.current >= this.textQuestions.length) {
      this.finished = true;
    }
  }

  speak(text: string) {
    this.speechService.speak(text);
  }

  ngOnDestroy() {
    this.speechService.stop();
  }

}
