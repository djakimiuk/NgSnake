import { Component, OnInit } from '@angular/core';
import { HighscoresService } from '../../app/services/highscores.service';
import { Subscription } from 'rxjs';
import { Scores } from '../../app/interfaces/scores.interface';
@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.scss'],
})
export class HighscoresComponent implements OnInit {
  public allScores: Array<Scores> = [];
  public sub!: Subscription;
  public errorMessage: string = '';
  public filterDirectionValue: string = 'desc';
  public filterActionValue: string = 'all';
  constructor(private _highscoresService: HighscoresService) {}

  ngOnInit(): void {
    this.sub = this._highscoresService.load().subscribe({
      next: (scores: Array<Scores>) => {
        this.allScores = scores;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
