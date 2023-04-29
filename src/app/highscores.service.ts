import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scores } from './highscores/highscores.component';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  private URL = 'https://scores.chrum.it/scores/snake';

  constructor(private _http: HttpClient) {}

  public load(): Observable<Scores[]> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this._http
      .get<Scores[]>(this.URL, { headers: headers })
      .pipe(tap((data) => console.log('All scores', data)));
  }
}
