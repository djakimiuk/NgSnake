import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerInfoService {
  private _isFormSubmitted = false;

  constructor() {}
  public markFormAsSubmitted() {
    this._isFormSubmitted = true;
  }
}
