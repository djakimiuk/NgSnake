import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scores } from './highscores/highscores.component';
import { Observable, Subscription, tap } from 'rxjs';
import { PlayerInfoService } from './player-info.service';
import { GameInfoService } from './game-info.service';

export interface PostScore {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  private getURL = 'https://scores.chrum.it/scores/snake';
  private postURL = 'https://scores.chrum.it/scores';

  constructor(
    private _http: HttpClient,
    private _playerInfoService: PlayerInfoService,
    private _gameInfoService: GameInfoService
  ) {}

  public load(): Observable<Scores[]> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this._http
      .get<Scores[]>(this.getURL, { headers: headers })
      .pipe(tap((data) => console.log('All scores', data)));
  }

  public postScore() {
    const playerData = this._playerInfoService.getPlayerData();
    const score = this._gameInfoService.getScore();
    const headers = new HttpHeaders({
      'auth-token': playerData.token,
      'Content-Type': 'application/json',
    });
    const data = {
      name: playerData.name,
      game: 'snake',
      score: score,
    };
    return this._http.post<any>(this.postURL, data, { headers: headers });
  }
}
