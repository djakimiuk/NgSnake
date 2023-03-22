import { Component, Input, OnInit } from '@angular/core';
import { PlayerInfoService } from '../player-info.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public scoreVisibility: boolean = true;
  @Input() score: number = 0;
  @Input() timer: number = 0;
  @Input() gameStatus: string = '';

  constructor(private _playerInfoService: PlayerInfoService) {}

  ngOnInit(): void {}
}
