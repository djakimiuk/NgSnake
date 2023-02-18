import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NameAndEmail } from '../app.component';

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

  constructor() {}
  ngOnInit(): void {}

  public formSubmit(form: NameAndEmail) {
    this.start.emit({
      name: form.name,
      email: form.email,
      visibility: false,
    });
  }
}
