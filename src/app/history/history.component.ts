import { Component, Input, OnInit } from '@angular/core';

import { PlayerHistory } from '../snake/snake.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @Input() playersHistory: Array<PlayerHistory> = [];
  @Input() playersArray: Array<any> = [];
  public filterActionValue: string = 'all';
  public filterDirectionValue: string = 'asc';

  public uniqueActions = [
    'Game History Button',
    'Start Game Button',
    'Stop Game Button',
    'Reset Game Button',
    'Up Button',
    'Right Button',
    'Down Button',
    'Left Button',
  ];

  constructor() {}

  ngOnInit(): void {}
}
