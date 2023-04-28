import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { NameEmailAndVisibility } from './form/form.component';
import { PlayerHistory } from './snake/snake.component';
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
  public playersHistory: Array<PlayerHistory> = [];
  public historyVisibility = true;

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
    this.playersHistory = [];
  }
  public onHistoryClicked(event: boolean) {
    if (event === false) {
      this.historyVisibility = false;
    }
    this.historyVisibility = !this.historyVisibility;
  }
  public onHistoryChange(event: PlayerHistory) {
    this.playersHistory.push(event);
  }
  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    console.log('it worked');
  }
}
