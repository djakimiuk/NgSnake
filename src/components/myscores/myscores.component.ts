import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerInfoService } from '../../app/services/player-info.service';
import { HighscoresService } from '../../app/services/highscores.service';
import { Scores } from '../../app/interfaces/scores.interface';

@Component({
  selector: 'app-myscores',
  templateUrl: './myscores.component.html',
  styleUrls: ['./myscores.component.scss'],
})
export class MyscoresComponent implements OnInit {
  public allScores: Array<Scores> = [];
  public sub!: Subscription;
  public filterDirectionValue: string = 'desc';
  public errorMessage: string = '';
  public playerName: string = 'Dawid';

  constructor(
    private _playerInfoService: PlayerInfoService,
    private _highscoresService: HighscoresService
  ) {}

  ngOnInit(): void {
    this.sub = this._highscoresService.load().subscribe({
      next: (scores: Array<Scores>) => {
        this.allScores = scores;
      },
      error: (err) => (this.errorMessage = err),
    });
    let playerData = this._playerInfoService.getPlayerData();
    this.playerName = playerData.name;
  }
}
