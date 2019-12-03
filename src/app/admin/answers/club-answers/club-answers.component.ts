import {Component, OnInit} from '@angular/core';
import {Club} from '../../../models/club.model';
import {ClubService} from '../../../services/club.service';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../../../services/question.service';
import {Question} from '../../../models/question.model';
import {ExcelService} from '../../../services/excel.service';
import {AnswerService} from '../../../services/answer.service';

@Component({
  selector: 'app-club-answers',
  templateUrl: './club-answers.component.html',
  styles: []
})
export class ClubAnswersComponent implements OnInit {
  private club: Club;
  private questions: Question[];
  private loadingClub: boolean;
  private loadingQuestions: boolean;
  private loadingExcel: boolean;

  constructor(private route: ActivatedRoute, private clubService: ClubService, private questionService: QuestionService,
              private answerService: AnswerService, private excelService: ExcelService) {
    this.loadingClub = true;
    this.loadingQuestions = true;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clubService.get(params.id).subscribe(resp => {
        this.club = resp;
        this.loadingClub = false;
      });
    });
    this.questionService.all().subscribe(resp => {
      this.questions = resp;
      this.loadingQuestions = false;
    });
  }

  async saveAsExcel() {
    this.loadingExcel = true;
    const data = await this.getData();
    console.log('data', data);
    this.excelService.exportAsExcel(data, this.club.name);
    this.loadingExcel = false;
  }

  async getData() {
    const data = [];
    for (const q of this.questions) {
      await this.answerService.getQuestionAnswers(this.club.id, q.id).toPromise().then(
        (resp: any[]) => {
          resp.map((r: any) => {
            return {pregunta: r.question.statement, estrellas: r.stars, 'si/no': r.response, respuesta: r.text, fecha: r.created_at};
          }).forEach(r => data.push(r));
        },
        err => {
          throw err;
        }
      );
    }
    return data;
  }

}
