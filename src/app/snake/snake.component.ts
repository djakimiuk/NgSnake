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
  @Input() public currentPlayer: string = '';
  public score: number = 0;
  public timer: number = 0;
  public timerInterval: any;
  public isHistoryClicked: boolean = false;
  @Output() exit = new EventEmitter<boolean>();
  @Output() scoreValue = new EventEmitter<number>();
  @Output() timerValue = new EventEmitter<number>();
  @Output() gameStatus = new EventEmitter<string>();
  @Output() history = new EventEmitter<boolean>();
  @Output() playerHistory = new EventEmitter<PlayerHistory>();

  public scoreIncrement() {
    this.score++;
    this.scoreValue.emit(this.score);
  }

  public fatality() {
    this.timer = this.timer;
    clearInterval(this.timerInterval);
    this.gameStatus.emit('WASTED');
  }

  public exitGame() {
    this.exit.emit(true);
    this.score = 0;
    clearInterval(this.timerInterval);
    this.timer = 0;
    this.timerValue.emit(this.timer);
    this.scoreValue.emit(this.score);
    this.gameStatus.emit('READY');
    this.history.emit(false);
    this._snake.actionReset();
    this._router.navigate(['/welcome']);
  }
  public gameHistory() {
    this.playerHistory.emit({
      action: 'Game History Button',
      time: this.timer,
    });
    this._snake.actionStop();
    this.timer = this.timer;
    clearInterval(this.timerInterval);
    this.timerValue.emit(this.timer);
    this.gameStatus.emit('HISTORY CHECK');
    this.history.emit();
    this.isHistoryClicked = !this.isHistoryClicked;
  }
  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;

  public onStartButtonPressed() {
    this._snake.actionStart();
    this.gameStatus.emit('STARTED');
    this.playerHistory.emit({ action: 'Start Game Button', time: this.timer });
    this.timerInterval = setInterval(() => {
      this.timer++;
      this.timerValue.emit(this.timer);
    }, 1000);
  }
  public onStopButtonPressed() {
    this.playerHistory.emit({ action: 'Stop Game Button', time: this.timer });
    this._snake.actionStop();
    this.timer = this.timer;
    clearInterval(this.timerInterval);
    this.timerValue.emit(this.timer);
    this.gameStatus.emit('PAUSED');
  }
  public onResetButtonPressed() {
    this.playerHistory.emit({ action: 'Reset Game Button', time: this.timer });
    this.score = 0;
    clearInterval(this.timerInterval);
    this.timer = 0;
    this.timerValue.emit(this.timer);
    this.scoreValue.emit(this.score);
    this.gameStatus.emit('READY');
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
    private _playerInfoService: PlayerInfoService
  ) {}

  ngOnInit(): void {}
}
