import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import * as RecordRTC from 'recordrtc';
import * as moment from 'moment';
import {RecordedAudioOutput} from '../models/recorded-audio-output.interface';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {
  private stream;
  private recorder;
  private interval;
  private startTime;
  private recorded: Subject<RecordedAudioOutput>;
  private recordingTime: Subject<string>;
  private recordingFailed: Subject<string>;


  constructor() {
    this.recorded = new Subject<RecordedAudioOutput>();
    this.recordingTime = new Subject<string>();
    this.recordingFailed = new Subject<string>();
  }

  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this.recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this.recordingTime.asObservable();
  }

  recordFailed(): Observable<string> {
    return this.recordingFailed.asObservable();
  }

  startRecording() {
    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }
    this.recordingTime.next('00:00');
    navigator.mediaDevices.getUserMedia({audio: true}).then(s => {
      this.stream = s;
      this.record();
    }).catch(error => {
      this.recordingFailed.next();
    });
  }

  abortRecording() {
    this.stopMedia();
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop((blob) => {
        if (this.startTime) {
          const mp3Name = encodeURIComponent('audio' + new Date().getTime() + '.mp3');
          this.stopMedia();
          this.recorded.next({blob, title: mp3Name});
        }
      }, () => {
        this.stopMedia();
        this.recordingFailed.next();
      });
    }
  }

  private record() {
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/webm'
    });
    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(
      () => {
        const currentTime = moment();
        const diffTime = moment.duration(currentTime.diff(this.startTime));
        const time = this.toString(diffTime.minutes()) + ':' + this.toString(diffTime.seconds());
        this.recordingTime.next(time);
      },
      1000
    );
  }

  private toString(value) {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }
}
