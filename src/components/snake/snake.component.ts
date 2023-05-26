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
import { PlayerHistory } from 'src/app/interfaces/player-history.interface';

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
  public theme: string;
  public isHistoryClicked: boolean = false;
  public startBtnDisabled: boolean = false;
  public stopBtnDisabled: boolean = true;
  public resetBtnDisabled: boolean = true;
  public url: string = '';

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
    if (this.gameStatus !== 'READY') {
      this._gameInfoService.stopTimer();
      this._snake.actionStop();
      this.timer = this.timer;
    }
    this._gameInfoService.saveAction('Game History Button');
    this._gameInfoService.setStatus('HISTORY CHECK');
    this._router.navigate(['/history']);
  }

  public onMyScoresPressed() {
    if (this.gameStatus !== 'READY') {
      this._gameInfoService.stopTimer();
      this._snake.actionStop();
      this.timer = this.timer;
    }
    this._gameInfoService.saveAction('My Scores Button');
    this._gameInfoService.setStatus('MY SCORES CHECK');
    this._router.navigate(['/myscores']);
  }

  public onHighScoresPressed() {
    if (this.gameStatus !== 'READY') {
      this._gameInfoService.stopTimer();
      this._snake.actionStop();
      this.timer = this.timer;
    }
    this._gameInfoService.saveAction('Highscores Button');
    this._gameInfoService.setStatus('HIGHSCORES CHECK');
    this._router.navigate(['/scores']);
  }

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
      this._gameInfoService.saveAction('Start Game Button');
    }
  }
  public onStopButtonPressed() {
    this._gameInfoService.saveAction('Stop Game Button');
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
    this._gameInfoService.saveAction('Reset Game Button');
    this.score = 0;
    this.timer = 0;
    this._gameInfoService.resetTimer();
    this._gameInfoService.scoreReset();
    this._gameInfoService.setStatus('READY');
    this._snake.actionReset();
  }
  public onUpButtonPressed() {
    this._snake.actionUp();
    this._gameInfoService.saveAction('Up Button');
  }
  public onRightButtonPressed() {
    this._snake.actionRight();
    this._gameInfoService.saveAction('Right Button');
  }
  public onDownButtonPressed() {
    this._snake.actionDown();
    this._gameInfoService.saveAction('Down Button');
  }
  public onLeftButtonPressed() {
    this._snake.actionLeft();
    this._gameInfoService.saveAction('Left Button');
  }

  public onChangeThemePressed() {
    this.theme = this.theme === 'normal' ? 'black-white' : 'normal';
    this._router.navigate([`/game/${this.theme}`]);
  }

  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;

  constructor(
    private _router: Router,
    private _playerInfoService: PlayerInfoService,
    private _gameInfoService: GameInfoService,
    private _route: ActivatedRoute,
    private _highscoresService: HighscoresService
  ) {
    let theme = this._route.snapshot.paramMap.get('color');
    this.theme = theme ? theme : '';
  }

  ngOnInit(): void {
    let playerData = this._playerInfoService.getPlayerData();
    this.currentPlayer = playerData.name;
    this.url = this._router.url;
  }

  ngOnDestroy() {
    this._gameInfoService.resetTimer();
  }
}
