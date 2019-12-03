import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Club} from '../../models/club.model';
import {ClubService} from '../../services/club.service';
import {environment} from '../../../environments/environment';
import {Question} from '../../models/question.model';
import {QuestionService} from '../../services/question.service';

@Component({
  selector: 'app-club-survey',
  templateUrl: './club-survey.component.html',
  styleUrls: ['./club-survey.component.scss']
})
export class ClubSurveyComponent implements OnInit {
  private club: Club;
  private boolQuestions: Question[];
  private starsQuestions: Question[];
  private textQuestions: Question[];
  private apiUrl: string;
  private loading: boolean;
  private started: boolean;
  private finished: boolean;
  private current: number;
  private currentType: string;

  constructor(private clubService: ClubService, private questionService: QuestionService, private route: ActivatedRoute) {
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

}
