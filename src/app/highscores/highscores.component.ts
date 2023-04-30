import { Component, OnInit } from '@angular/core';
import { HighscoresService } from '../highscores.service';
import { Subscription } from 'rxjs';
export interface Scores {
  name: string;
  score: number;
}
@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.scss'],
})
export class HighscoresComponent implements OnInit {
  public allScores: any = '';
  public sub!: Subscription;
  public errorMessage: string = '';
  public filterDirectionValue: string = 'desc';
  public filterActionValue: string = 'my-scores';
  public playerName: string = 'Dawid'
  constructor(private _highscores: HighscoresService) {}

  ngOnInit(): void {
    this.sub = this._highscores.load().subscribe({
      next: (scores) => {
        this.allScores = scores;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
