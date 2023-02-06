import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSnakeComponent } from 'ngx-snake';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
})
export class SnakeComponent implements OnInit {
  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;

  public onStartButtonPressed() {
    this._snake.actionStart();
  }
  public onStopButtonPressed() {
    this._snake.actionStop();
  }
  public onResetButtonPressed() {
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
