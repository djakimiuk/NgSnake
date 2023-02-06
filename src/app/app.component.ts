import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NG SNAKE';
  public formVisibility = false;
  public onStartClicked(event: boolean) {
    this.formVisibility = event;
  }
}
