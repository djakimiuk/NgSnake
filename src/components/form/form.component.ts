import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../../app/services/player-info.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { lastValueFrom } from 'rxjs';

export interface NameEmailAndVisibility {
  name: string;
  email: string;
  visibility: boolean;
}
function tokenValidation(
  c: AbstractControl
): { [key: string]: boolean } | null {
  if (
    c.value !== null &&
    (isNaN(c.value) ||
      c.value < 0 ||
      c.value.length !== 4 ||
      +c.value.slice(0, 2) !== 69)
  ) {
    return { tokenValidation: true };
  }
  return null;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public themes: Array<string> = ['normal', 'black-white'];
  public theme!: any;
  public playerForm!: FormGroup;
  private _response: any = '';
  constructor(
    private _router: Router,
    private playerInfoService: PlayerInfoService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.playerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      token: [null, [Validators.required]],
      theme: ['normal'],
    });
  }

  public async formSubmit() {
    try {
      const source$ = this.playerInfoService.validateToken(
        this.playerForm.controls['token'].value
      );
      const response = await lastValueFrom(source$);
      console.log(response.success === true);
      if (response.success === true) {
        this.theme = this.playerForm.controls['theme'].value;
        this.playerInfoService.markFormAsSubmitted();
        this.playerInfoService.storePlayerData({
          name: this.playerForm.controls['name'].value,
          token: this.playerForm.controls['token'].value,
          theme: this.theme,
          date: new Date(),
        });
        this._router.navigate([`/game/${this.theme}`]);
      } else {
        alert('Invalid token!');
      }
    } catch (error) {
      alert(`There was an error: ${error}`);
    }
  }
}
