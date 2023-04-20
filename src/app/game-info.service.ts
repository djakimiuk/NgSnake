import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameInfoService {
  private _timer: number = 0;
  private _score: number = 0;
  private _gameStatus: string = '';
  private _timerInterval: any;
  @Output() exit = new EventEmitter<boolean>();
  @Output() scoreValue = new EventEmitter<number>();
  @Output() timerValue = new EventEmitter<number>();
  @Output() gameStatus = new EventEmitter<string>();

  constructor() {}

  public startTimer() {
    this._timerInterval = setInterval(() => {
      this._timer++;
      this.timerValue.emit(this._timer);
    }, 1000);
  }

  public stopTimer() {
    clearInterval(this._timerInterval);
    this.timerValue.emit(this._timerInterval);
  }

  public resetTimer() {
    clearInterval(this._timerInterval);
    this._timer = 0;
    this.timerValue.emit(this._timerInterval);
  }

  public setStatus(status: string) {
    this._gameStatus = status;
    this.gameStatus.emit(this._gameStatus);
  }

  public scoreIncrement() {
    this._score++;
    this.scoreValue.emit(this._score);
  }

  public scoreReset() {
    this._score = 0;
    this.scoreValue.emit(this._score);
  }
}
