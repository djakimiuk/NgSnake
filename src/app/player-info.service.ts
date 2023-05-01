import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface PlayerData {
  name: string;
  token: string;
  theme: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerInfoService {
  private _isFormSubmitted: boolean = false;
  private _playerData: Array<PlayerData> = [];
  private _validationURL = 'https://scores.chrum.it/check-token';
  isFormSubmitted$ = new BehaviorSubject<boolean>(false)

  constructor(private _http: HttpClient) {}

  public markFormAsSubmitted() {
    this._isFormSubmitted = !this._isFormSubmitted;
    this.isFormSubmitted$.next(this._isFormSubmitted);
  }

  public storePlayerData(playerData: PlayerData) {
    this._playerData.push(playerData);
  }

  public getPlayerData() {
    return this._playerData[0];
  }

  public clearPlayerData() {
    this._playerData = [];
  }

  public isFormSubmittedCheck() {
    return this._isFormSubmitted;
  }

  public checkPlayerData() {
    return this._playerData.length !== 0;
  }

  validateToken(token: string): Observable<any> {
    return this._http.post<any>(this._validationURL, { 'auth-token': token });
  }
}
