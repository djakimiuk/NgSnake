import { Component, Input, OnInit } from '@angular/core';
import { PlayerInfoService } from '../../app/services/player-info.service';
import { GameInfoService } from '../../app/services/game-info.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public scoreVisibility$ = this._playerInfoService.isFormSubmitted$;
  public timer = 0;
  public score$ = this._gameInfoService.score$;
  public timer$ = this._gameInfoService.timerValue$;
  public gameStatus$ = this._gameInfoService.gameStatus$;

  constructor(
    private _playerInfoService: PlayerInfoService,
    private _gameInfoService: GameInfoService
  ) {}

  ngOnInit() {

  }
  ngOnDestroy() {
    this._gameInfoService.resetTimer();
  }
}
