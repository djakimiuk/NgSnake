import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSnakeModule } from 'ngx-snake';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnakeComponent } from './snake/snake.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SnakeComponent,
    NavbarComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule, NgxSnakeModule, NgbModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
