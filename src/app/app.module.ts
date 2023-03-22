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
import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sort.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SnakeComponent,
    NavbarComponent,
    HistoryComponent,
    FilterPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    NgxSnakeModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: FormComponent },
      { path: 'game', component: SnakeComponent },
      { path: '**', component: FormComponent },
      { path: '', component: FormComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
