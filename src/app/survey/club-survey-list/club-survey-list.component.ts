import {Component, OnInit} from '@angular/core';
import {ClubService} from '../../services/club.service';
import {Club} from '../../models/club.model';

@Component({
  selector: 'app-club-survey-list',
  templateUrl: './club-survey-list.component.html',
  styleUrls: ['./club-survey-list.component.scss']
})
export class ClubSurveyListComponent implements OnInit {
  cardPlaceholder: any;
  clubs: Club[];
  loading: boolean;

  constructor(private clubService: ClubService) {
    this.loading = true;
    this.cardPlaceholder = Array(8).keys();
  }

  ngOnInit() {
    this.clubService.all().subscribe((resp: any) => {
      this.clubs = resp;
      this.loading = false;
    });
  }

}
