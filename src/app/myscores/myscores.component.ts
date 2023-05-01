import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerInfoService } from '../player-info.service';
import { HighscoresService } from '../highscores.service';
import { Scores } from '../interfaces/scores.interface';

@Component({
  selector: 'app-myscores',
  templateUrl: './myscores.component.html',
  styleUrls: ['./myscores.component.scss'],
})
export class MyscoresComponent implements OnInit {
  public allScores: any = '';
  public sub!: Subscription;
  public filterDirectionValue: string = 'desc';
  public errorMessage: string = '';
  public playerName: string = 'Dawid';

  constructor(private _playerInfoService: PlayerInfoService, private _highscoresService: HighscoresService) {}

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
