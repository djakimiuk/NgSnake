import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameInfoService {
  private _timer: number = 0;
  private _score: number = 0;
  private _gameStatus: string = 'READY';
  private _timerInterval: any;
  @Output() exit = new EventEmitter<boolean>();
  timerValue$ = new BehaviorSubject<number>(0);
  gameStatus$ = new BehaviorSubject<string>('READY');
  score$ = new BehaviorSubject<number>(0);

  constructor() {}

  public startTimer() {
    this._timerInterval = setInterval(() => {
      this._timer++;
      this.timerValue$.next(this._timer);
    }, 1000);
  }

  public stopTimer() {
    clearInterval(this._timerInterval);
    this._timer = this._timer;
    this.timerValue$.next(this._timer);
  }

  public resetTimer() {
    clearInterval(this._timerInterval);
    this._timer = 0;
    this.timerValue$.next(this._timer);
  }

  public setStatus(status: string) {
    this._gameStatus = status;
    this.gameStatus$.next(this._gameStatus);
  }

  public scoreIncrement() {
    this._score++;
    this.score$.next(this._score);
  }

  public scoreReset() {
    this._score = 0;
    this.score$.next(this._score);
  }

  public getStatus() {
    return this._gameStatus;
  }
}
