import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Club} from '../../models/club.model';
import {environment} from '../../../environments/environment';
import {SpeechService} from '../../services/speech.service';

@Component({
  selector: 'app-club-survey-card',
  templateUrl: './club-survey-card.component.html',
  styleUrls: ['./club-survey-card.component.scss']
})
export class ClubSurveyCardComponent implements OnDestroy {
  @Input() club: Club;
  private apiUrl: string;

  constructor(private speechService: SpeechService) {
    this.apiUrl = environment.apiUrl;
  }

  speak(text: string) {
    this.speechService.speak(text);
  }

  ngOnDestroy() {
    this.speechService.stop();
  }

}
