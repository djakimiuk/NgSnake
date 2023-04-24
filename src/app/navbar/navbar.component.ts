import { Component, Input, OnInit } from '@angular/core';
import { PlayerInfoService } from '../player-info.service';
import { GameInfoService } from '../game-info.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public scoreVisibility: boolean = false;
  public score$ = this._gameInfoService.score$;
  public timer$ = this._gameInfoService.timerValue$
  public gameStatus$ = this._gameInfoService.gameStatus$;

  constructor(
    private _playerInfoService: PlayerInfoService,
    private _gameInfoService: GameInfoService
  ) {}

  ngOnInit() {
    this._playerInfoService.change.subscribe((isFormSubmitted) => {
      this.scoreVisibility = isFormSubmitted;
    });
  }
}
