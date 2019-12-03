import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AudioRecorderService} from '../../../services/audio-recorder.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AnswerService} from '../../../services/answer.service';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-text-question-form',
  templateUrl: './text-question-form.component.html',
  styleUrls: ['../../club-survey/club-survey.component.scss', './text-question-form.component.scss']
})
export class TextQuestionFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  @Input() clubId: number;
  @Input() question: Question;
  @Output() onAnswerSend: EventEmitter<boolean>;
  private isRecording;
  private recordedTime;
  private blob;
  private blobUrl;

  constructor(private audioRecorder: AudioRecorderService, private sanitizer: DomSanitizer, private answerService: AnswerService) {
    this.onAnswerSend = new EventEmitter<boolean>();
    this.form = new FormGroup({
      text: new FormControl('')
    });
    this.isRecording = false;
    this.audioRecorder.recordFailed().subscribe(() => {
      this.isRecording = false;
    });
    this.audioRecorder.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });
    this.audioRecorder.getRecordedBlob().subscribe((data) => {
      this.blob = data.blob;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    });
  }

  ngOnInit() {
  }

  sendAnswer() {
    if (this.form.valid) {
      const formData = new FormData();
      if (this.blobUrl) {
        formData.append('audio', this.blob);
      }
      formData.append('club_id', this.clubId.toString());
      formData.append('question_id', this.question.id.toString());
      formData.append('text', this.form.controls.text.value);
      this.answerService.store(formData).subscribe((resp: any) => {
        this.form.reset();
        this.onAnswerSend.emit(true);
      });
    }
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecorder.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecorder.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecorder.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
    this.blob = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

}
