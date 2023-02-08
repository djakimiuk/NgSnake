import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgxSnakeComponent } from 'ngx-snake';

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
  @Output() exit = new EventEmitter<boolean>();
  @Output() scoreValue = new EventEmitter<number>();
  @Output() timerValue = new EventEmitter<number>();
  @Output() gameStatus = new EventEmitter<string>();

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
  }

  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;

  public onStartButtonPressed() {
    this._snake.actionStart();
    this.gameStatus.emit('STARTED');
    this.timerInterval = setInterval(() => {
      this.timer++;
      this.timerValue.emit(this.timer);
    }, 1000);
  }
  public onStopButtonPressed() {
    this._snake.actionStop();
    this.timer = this.timer;
    clearInterval(this.timerInterval);
    this.timerValue.emit(this.timer);
    this.gameStatus.emit('PAUSED');
  }
  public onResetButtonPressed() {
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
  }
  public onRightButtonPressed() {
    this._snake.actionRight();
  }
  public onDownButtonPressed() {
    this._snake.actionDown();
  }
  public onLeftButtonPressed() {
    this._snake.actionLeft();
  }

  constructor() {}

  ngOnInit(): void {}
}
