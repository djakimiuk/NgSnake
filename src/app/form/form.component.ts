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

  constructor(
    private _router: Router,
    private playerInfoService: PlayerInfoService
  ) {}
  ngOnInit(): void {}

  public formSubmit(form: NameAndEmail) {
    this._router.navigate(['/game']);
    this.playerInfoService.markFormAsSubmitted();
    this.playerInfoService.storePlayerData(form.name, form.email);
  }
}
