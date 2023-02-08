import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() scoreVisibility: boolean = true;
  @Input() score: number = 0;
  @Input() timer: number = 0;
  @Input() gameStatus: string = ''

  constructor() {}

  ngOnInit(): void {}
}
