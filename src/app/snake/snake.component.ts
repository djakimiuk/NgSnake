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
  public timerValue: number = 0;
  public timerInterval: any;
  @Output() exit = new EventEmitter<boolean>();

  public scoreIncrement() {
    this.score++;
  }

  public fatality() {
    this.timerValue = this.timerValue;
    clearInterval(this.timerInterval);
  }

  public exitGame() {
    this.exit.emit(true);
  }

  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;

  public onStartButtonPressed() {
    this._snake.actionStart();
    this.timerInterval = setInterval(() => {
      this.timerValue++;
    }, 1000);
  }
  public onStopButtonPressed() {
    this._snake.actionStop();
    this.timerValue = this.timerValue;
    clearInterval(this.timerInterval);
  }
  public onResetButtonPressed() {
    this.score = 0;
    clearInterval(this.timerInterval);
    this.timerValue = 0;
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
