import {Component, OnInit} from '@angular/core';
import {ClubService} from '../../../services/club.service';
import {Club} from '../../../models/club.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-answers-club-list',
  templateUrl: './answers-club-list.component.html',
  styleUrls: ['./answers-club-list.component.scss']
})
export class AnswersClubListComponent implements OnInit {
  clubs: Club[];
  form: FormGroup;
  loading: boolean;
  dateRange: any;

  constructor(private clubService: ClubService) {
    this.form = new FormGroup({
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
    });
    this.loading = false;
    this.dateRange = this.getDateRange();
  }

  ngOnInit() {
    this.clubService.all().subscribe(resp => {
      this.clubs = resp;
    });
    this.initForm();
  }

  setDateRange() {
    if (this.form.valid) {
      localStorage.setItem('dateRange', JSON.stringify(this.form.value));
      this.dateRange = this.getDateRange();
    }
  }

  private getDateRange() {
    if (localStorage.getItem('dateRange')) {
      return JSON.parse(localStorage.getItem('dateRange'));
    }
    return null;
  }

  private initForm() {
    if (this.dateRange) {
      this.form.controls.startDate.setValue(this.dateRange.startDate);
      this.form.controls.endDate.setValue(this.dateRange.endDate);
    }
  }

  resetForm() {
    this.form.reset();
    localStorage.removeItem('dateRange');
    this.dateRange = null;
  }
}
