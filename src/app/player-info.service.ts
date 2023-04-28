import { EventEmitter, Injectable, Output } from '@angular/core';
import { NameAndEmail } from './app.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerInfoService {
  isFormSubmitted: boolean = false;
  private _playerData: Array<NameAndEmail> = [];
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

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
}
