import { Injectable } from '@angular/core';
import Speech from 'speak-tts';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private speech: Speech;

  constructor() {
    this.speech = new Speech();
    this.speech.init({
      volume: 1,
      lang: 'es-US',
      rate: 1,
      pitch: 1,
      voice: 'Google español de Estados Unidos'
    });
  }

  public speak(phrase: string) {
    this.speech.speak({
      text: phrase,
      queue: false
    });
  }

  public stop() {
    this.speech.cancel();
  }
}
