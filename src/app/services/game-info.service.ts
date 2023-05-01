import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, ReplaySubject, timer } from 'rxjs';
import { PlayerHistory } from '../interfaces/player-history.interface';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GameInfoService {
  private _timer: number = 0;
  private _score: number = 0;
  private _gameStatus: string = 'READY';
  private _timerSubcription: any;
  private _historyArray: Array<PlayerHistory> = [];
  private _theme: string = '';
  timerValue$ = new BehaviorSubject<number>(0);
  gameStatus$ = new BehaviorSubject<string>('READY');
  score$ = new BehaviorSubject<number>(0);
  historyArrayChange$ = new BehaviorSubject<Array<PlayerHistory>>([]);

  constructor(private _location: Location) {}

  ngOnInit() {}

  public startTimer() {
    this._timerSubcription = timer(0, 1000).subscribe(() => {
      this._timer++;
      this.timerValue$.next(this._timer);
    });
  }

  public stopTimer() {
    this._timerSubcription.unsubscribe();
    this._timer = this._timer;
    this.timerValue$.next(this._timer);
  }

  public resetTimer() {
    this._timerSubcription.unsubscribe();
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
  public getScore() {
    return this._score;
  }
  public saveAction(action: string) {
    this._historyArray.push({ action: action, time: this._timer });
  }
  public getActionHistory() {
    return this._historyArray;
  }
}
