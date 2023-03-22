import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NameAndEmail } from '../app.component';
import { PlayerInfoService } from '../player-info.service';

export interface NameEmailAndVisibility {
  name: string;
  email: string;
  visibility: boolean;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Output() public start = new EventEmitter<NameEmailAndVisibility>();

  constructor(
    private _router: Router,
    private playerInfoService: PlayerInfoService
  ) {}
  ngOnInit(): void {}

  public formSubmit(form: NameAndEmail) {
    this.start.emit({
      name: form.name,
      email: form.email,
      visibility: false,
    });
    this._router.navigate(['/game']);
    this.playerInfoService.markFormAsSubmitted();
  }
}
