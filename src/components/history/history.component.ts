import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlayerHistory } from 'src/app/interfaces/player-history.interface';
import { GameInfoService } from 'src/app/services/game-info.service';
import { PlayerInfoService } from 'src/app/services/player-info.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  public playersHistory: Array<PlayerHistory> = [];
  public filterDirectionValue: string = 'asc';
  public filterActionValue: string = 'all';
  public playerName: string = '';

  public uniqueActions = [
    'Game History Button',
    'Start Game Button',
    'Stop Game Button',
    'Reset Game Button',
    'Up Button',
    'Right Button',
    'Down Button',
    'Left Button',
  ];

  public onBackPressed(): void {
    this._location.back();
    this._gameInfoService.setStatus('READY')
  }

  constructor(
    private _gameInfoService: GameInfoService,
    private _playerInfoService: PlayerInfoService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    let playerData = this._playerInfoService.getPlayerData();
    this.playerName = playerData.name;
    this.playersHistory = this._gameInfoService.getActionHistory();
  }
}
