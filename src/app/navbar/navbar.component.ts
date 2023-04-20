import { Component, Input, OnInit } from '@angular/core';
import { PlayerInfoService } from '../player-info.service';
import { GameInfoService } from '../game-info.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public scoreVisibility: boolean = false;
  public score: number = 0;
  public timer: number = 0;
  public gameStatus: string = 'READY';

  constructor(
    private _playerInfoService: PlayerInfoService,
    private _gameInfoService: GameInfoService
  ) {}

  ngOnInit() {
    this._playerInfoService.change.subscribe((isFormSubmitted) => {
      this.scoreVisibility = isFormSubmitted;
    });
    this._gameInfoService.scoreValue.subscribe((score) => {
      this.score = score;
    });
    this._gameInfoService.timerValue.subscribe((timer) => {
      this.timer = timer;
    });
    this._gameInfoService.gameStatus.subscribe((status) => {
      this.gameStatus = status;
    });
  }
}
