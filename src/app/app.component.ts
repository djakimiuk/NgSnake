import { Component, EventEmitter, Output } from '@angular/core';
import { NameEmailAndVisibility } from './form/form.component';
export interface NameAndEmail {
  name: string;
  email: string;
}

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
  public playersArray: Array<NameAndEmail> = [];

  public onStartClicked(event: NameEmailAndVisibility) {
    this.formVisibility = event.visibility;
    this.playersArray.push({
      name: event.name,
      email: event.email,
    });
    this.playersArray = [...this.playersArray];
    this.playerName = event.name;
  }

  public onExitClicked(event: boolean) {
    this.formVisibility = event;
  }
  public onScoreChange(event: number) {
    this.score = event;
  }
  public onTimerChange(event: number) {
    this.timer = event;
  }
  public onStatusChange(event: string) {
    this.gameStatus = event;
  }
}
