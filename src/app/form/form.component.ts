import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
  public name = '';
  public email = '';
  public nameAlertVisibility = true;
  public emailAlertVisibility = true;
  @Output() public start = new EventEmitter<NameEmailAndVisibility>();

  constructor() {}
  ngOnInit(): void {}

  public nameValidation() {
    let name = this.name;
    console.log(name.length);
    if (name.length < 3) {
      this.nameAlertVisibility = false;
    } else {
      this.nameAlertVisibility = true;
    }
  }

  public emailValidation() {
    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!this.email.match(validEmailRegex)) {
      this.emailAlertVisibility = false;
    } else if (this.email.match(validEmailRegex) && this.nameAlertVisibility) {
      this.emailAlertVisibility = true;
      this.start.emit({
        name: this.name,
        email: this.email,
        visibility: false,
      });
      this.name = '';
      this.email = '';
    }
  }
}
