import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSnakeComponent } from 'ngx-snake';
import { PlayerInfoService } from '../../app/services/player-info.service';
import { GameInfoService } from '../../app/services/game-info.service';
import { HighscoresService } from '../../app/services/highscores.service';
import { lastValueFrom } from 'rxjs';
export interface PlayerHistory {
  action: string;
  time: number;
}

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SnakeComponent implements OnInit {
  public currentPlayer: string = '';
  public score: number = 0;
  public timer: number = 0;
  public gameStatus: string = 'READY';
  public isHistoryClicked: boolean = false;
  public startBtnDisabled: boolean = false;
  public stopBtnDisabled: boolean = true;
  public resetBtnDisabled: boolean = true;
  public url: string = '';
  public theme: string | null = 'normal';
  @Output() history = new EventEmitter<boolean>();
  @Output() playerHistory = new EventEmitter<PlayerHistory>();

  public scoreIncrement() {
    this.score++;
    this._gameInfoService.scoreIncrement();
  }

  public async fatality() {
    try {
      this.timer = this.timer;
      this.startBtnDisabled = false;
      this.stopBtnDisabled = true;
      this.resetBtnDisabled = false;
      this._gameInfoService.stopTimer();
      this._gameInfoService.setStatus('WASTED');
      this.theme = 'fatality';
      const source$ = this._highscoresService.postScore();
      const response = await lastValueFrom(source$);
      alert(`Score saved succesfully`);
    } catch (error) {
      alert(`There was an error ${error}`);
    }
  }

  public exitGame() {
    this.score = 0;
    this.timer = 0;
    this.startBtnDisabled = false;
    this.stopBtnDisabled = true;
    this.resetBtnDisabled = true;
    if (this.gameStatus !== 'READY') {
      this._gameInfoService.resetTimer();
      this._gameInfoService.scoreReset();
      this._gameInfoService.setStatus('READY');
      this._snake.actionReset();
    }
    this._router.navigate(['/welcome']);
    this._playerInfoService.clearPlayerData();
    this._playerInfoService.markFormAsSubmitted();
  }
  public gameHistory() {
    this.playerHistory.emit({
      action: 'Game History Button',
      time: this.timer,
    });
    this._snake.actionStop();
    this.timer = this.timer;
    if (this.gameStatus !== 'READY') {
      this._gameInfoService.stopTimer();
      this._gameInfoService.setStatus('HISTORY CHECK');
    }
    this.history.emit();
    this._router.navigate(['/history']);
    this.isHistoryClicked = !this.isHistoryClicked;
  }
  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;

  public onStartButtonPressed() {
    if (this._gameInfoService.getStatus() == 'WASTED') {
      this.onResetButtonPressed();
      this.onStartButtonPressed();
    } else {
      this.startBtnDisabled = true;
      this.stopBtnDisabled = false;
      this.resetBtnDisabled = false;
      this._snake.actionStart();
      this._gameInfoService.startTimer();
      this._gameInfoService.setStatus('STARTED');
      this.playerHistory.emit({
        action: 'Start Game Button',
        time: this.timer,
      });
    }
  }
  public onStopButtonPressed() {
    this.playerHistory.emit({ action: 'Stop Game Button', time: this.timer });
    this.startBtnDisabled = false;
    this.stopBtnDisabled = true;
    this.resetBtnDisabled = false;
    this._snake.actionStop();
    this.timer = this.timer;
    this._gameInfoService.stopTimer();
    this._gameInfoService.setStatus('PAUSED');
  }
  public onResetButtonPressed() {
    this.startBtnDisabled = false;
    this.stopBtnDisabled = true;
    this.resetBtnDisabled = true;
    this.playerHistory.emit({ action: 'Reset Game Button', time: this.timer });
    this.score = 0;
    this.timer = 0;
    this._gameInfoService.resetTimer();
    this._gameInfoService.scoreReset();
    this._gameInfoService.setStatus('READY');
    this._snake.actionReset();
  }
  public onUpButtonPressed() {
    this._snake.actionUp();
    this.playerHistory.emit({ action: 'Up Button', time: this.timer });
  }
  public onRightButtonPressed() {
    this._snake.actionRight();
    this.playerHistory.emit({ action: 'Right Button', time: this.timer });
  }
  public onDownButtonPressed() {
    this._snake.actionDown();
    this.playerHistory.emit({ action: 'Down Button', time: this.timer });
  }
  public onLeftButtonPressed() {
    this._snake.actionLeft();
    this.playerHistory.emit({ action: 'Left Button', time: this.timer });
  }

  public onChangeThemePressed() {
    this.theme = this.theme === 'normal' ? 'black-white' : 'normal';
    this._router.navigate([`/game/${this.theme}`]);
  }

  public onMyScoresPressed() {
    this._router.navigate(['/myscores']);
  }

  constructor(
    private _router: Router,
    private _playerInfoService: PlayerInfoService,
    private _gameInfoService: GameInfoService,
    private _route: ActivatedRoute,
    private _highscoresService: HighscoresService
  ) {
    this.theme = this._route.snapshot.paramMap.get('color');
  }

  ngOnInit(): void {
    let playerData = this._playerInfoService.getPlayerData();
    this.currentPlayer = playerData.name;
    this.url = this._router.url;
  }
}
