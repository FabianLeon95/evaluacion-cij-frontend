import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-answer-chart',
  templateUrl: './answer-chart.component.html',
  styles: []
})
export class AnswerChartComponent implements OnInit {
  @Input() answers: any[];
  @Input() type: string;
  data: any[];
  labels: Label[];
  chartType: ChartType;
  options: ChartOptions;
  legend: boolean;
  loading: boolean;

  constructor() {
    this.loading = true;
  }

  ngOnInit() {
    this.data = this.getData(this.type);
    this.setConfig(this.type);
    this.loading = false;
  }

  getBoolData() {
    let yes = 0;
    let no = 0;
    this.answers.forEach((answer: any) => {
      if (answer.response === 1) {
        yes++;
      } else {
        no++;
      }
    });
    return [yes, no];
  }

  private getStarsData() {
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    this.answers.forEach((answer: any) => {
      switch (answer.stars) {
        case 1:
          one++;
          break;
        case 2:
          two++;
          break;
        case 3:
          three++;
          break;
        case 4:
          four++;
          break;
      }
    });
    return [one, two, three, four];
  }

  private getData(type: string): number[] {
    switch (type) {
      case 'yesNo':
        return this.getBoolData();
      case 'stars':
        return this.getStarsData();
    }
  }

  private setConfig(type: string) {
    switch (type) {
      case 'yesNo':
        this.labels = ['Si', 'No'];
        this.chartType = 'pie';
        this.legend = true;
        this.options = {};
        return;
      case 'stars':
        this.labels = ['1 ⭐️', '2 ⭐️', '3 ⭐️', '4 ⭐️'];
        this.chartType = 'bar';
        this.legend = false;
        this.options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }]
          }
        };
        return;
    }
  }
}
