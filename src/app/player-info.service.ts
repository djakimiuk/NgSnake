import { EventEmitter, Injectable, Output } from '@angular/core';
import { NameAndEmail } from './app.component';
import { Observable, Subject, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlayerInfoService {
  isFormSubmitted: boolean = false;
  private _playerData: Array<NameAndEmail> = [];
  private _validationURL = 'https://scores.chrum.it/check-token';
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private _http: HttpClient) {}

  public markFormAsSubmitted() {
    this.isFormSubmitted = !this.isFormSubmitted;
    this.change.emit(this.isFormSubmitted);
  }

  public storePlayerData(name: string, email: string) {
    this._playerData.push({ name: name, email: email });
  }

  public getPlayerData() {
    return this._playerData[0];
  }

  public clearPlayerData() {
    this._playerData = [];
  }

  isFormSubmittedCheck() {
    return this.isFormSubmitted;
  }

  validateToken(token: string): Observable<any> {
    return this._http.post<any>(this._validationURL, { 'auth-token': token });
  }
}
