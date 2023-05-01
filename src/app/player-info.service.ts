import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
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
  isFormSubmitted: boolean = false;
  private _playerData: Array<PlayerData> = [];
  private _validationURL = 'https://scores.chrum.it/check-token';
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private _http: HttpClient) {}

  public markFormAsSubmitted() {
    this.isFormSubmitted = !this.isFormSubmitted;
    this.change.emit(this.isFormSubmitted);
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
    return this.isFormSubmitted;
  }

  public checkPlayerData() {
    return this._playerData.length !== 0;
  }

  validateToken(token: string): Observable<any> {
    return this._http.post<any>(this._validationURL, { 'auth-token': token });
  }
}
