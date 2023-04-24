import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSnakeComponent } from 'ngx-snake';
import { PlayerInfoService } from '../player-info.service';
import { GameInfoService } from '../game-info.service';
export interface PlayerHistory {
  action: string;
  time: number;
}

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
})
export class SnakeComponent implements OnInit {
  public currentPlayer: string = '';
  public score: number = 0;
  public timer: number = 0;
  public gameStatus: string = 'READY';
  public timerInterval: any;
  public isHistoryClicked: boolean = false;
  @Output() history = new EventEmitter<boolean>();
  @Output() playerHistory = new EventEmitter<PlayerHistory>();

  public scoreIncrement() {
    this.score++;
    this._gameIfnoService.scoreIncrement();
  }

  public fatality() {
    this.timer = this.timer;
    this._gameIfnoService.stopTimer();
    this._gameIfnoService.setStatus('WASTED');
  }

  public exitGame() {
    this.score = 0;
    this.timer = 0;
    this._gameIfnoService.resetTimer();
    this._gameIfnoService.scoreReset();
    this._gameIfnoService.setStatus('READY');
    this._snake.actionReset();
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
    clearInterval(this.timerInterval);
    this._gameIfnoService.stopTimer();
    this._gameIfnoService.setStatus('HISTORY CHECK');
    this.history.emit();
    this.isHistoryClicked = !this.isHistoryClicked;
  }
  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;

  public onStartButtonPressed() {
    if (this._gameIfnoService.getStatus() == 'WASTED') {
      this.onResetButtonPressed();
      this.onStartButtonPressed();
    }
    this._snake.actionStart();
    this._gameIfnoService.startTimer();
    this._gameIfnoService.setStatus('STARTED');
    this.playerHistory.emit({ action: 'Start Game Button', time: this.timer });
  }
  public onStopButtonPressed() {
    this.playerHistory.emit({ action: 'Stop Game Button', time: this.timer });
    this._snake.actionStop();
    this.timer = this.timer;
    this._gameIfnoService.stopTimer();
    this._gameIfnoService.setStatus('PAUSED');
  }
  public onResetButtonPressed() {
    this.playerHistory.emit({ action: 'Reset Game Button', time: this.timer });
    this.score = 0;
    clearInterval(this.timerInterval);
    this.timer = 0;
    this._gameIfnoService.resetTimer();
    this._gameIfnoService.scoreReset();
    this._gameIfnoService.setStatus('READY');
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

  constructor(
    private _router: Router,
    private _playerInfoService: PlayerInfoService,
    private _gameIfnoService: GameInfoService
  ) {}

  ngOnInit(): void {
    let playerData = this._playerInfoService.getPlayerData();
    this.currentPlayer = playerData.name;
  }
}
