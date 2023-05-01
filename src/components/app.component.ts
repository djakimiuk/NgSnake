import { Component, EventEmitter, Output } from '@angular/core';
import { NameEmailAndVisibility } from './form/form.component';
import { PlayerHistory } from 'src/app/interfaces/player-history.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NG SNAKE';
  public formVisibility = true;
  public playerName: string = '';
  public score: number = 0;
  public timer: number = 0;
  public gameStatus: string = 'READY';
  public playersHistory: Array<PlayerHistory> = [];
  public historyVisibility = true;
}
