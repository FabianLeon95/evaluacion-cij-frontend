import {Component, Input, OnInit} from '@angular/core';
import {Club} from '../../models/club.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-club-survey-card',
  templateUrl: './club-survey-card.component.html',
  styleUrls: ['./club-survey-card.component.scss']
})
export class ClubSurveyCardComponent implements OnInit {
  @Input() club: Club;
  private apiUrl: string;

  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
  }

}
