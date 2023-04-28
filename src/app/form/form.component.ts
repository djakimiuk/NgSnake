import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NameAndEmail } from '../app.component';
import { PlayerInfoService } from '../player-info.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  public playerForm!: FormGroup;
  constructor(
    private _router: Router,
    private playerInfoService: PlayerInfoService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.playerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      token: [null, [Validators.required, tokenValidation]],
      color: ['normal'],
    });
  }

  public formSubmit() {
    this._router.navigate(['/game']);
    this.playerInfoService.markFormAsSubmitted();
    this.playerInfoService.storePlayerData(
      this.playerForm.controls['name'].value,
      this.playerForm.controls['token'].value
    );
  }
}
