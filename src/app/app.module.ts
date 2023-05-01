import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSnakeModule } from 'ngx-snake';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnakeComponent } from './snake/snake.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HistoryComponent } from './history/history.component';
import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sort.pipe';
import { RouterModule } from '@angular/router';
import { HighscoresComponent } from './highscores/highscores.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPlayersPipe } from './filter-players.pipe';
import { SortPlayersPipe } from './sort-players.pipe';
import { MyscoresComponent } from './myscores/myscores.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SnakeComponent,
    NavbarComponent,
    HistoryComponent,
    FilterPipe,
    SortPipe,
    HighscoresComponent,
    FilterPlayersPipe,
    SortPlayersPipe,
    MyscoresComponent,
  ],
  imports: [
    BrowserModule,
    NgxSnakeModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: FormComponent },
      { path: 'game/:color', component: SnakeComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'scores', component: HighscoresComponent },
      {path: 'myscores', component: MyscoresComponent},
      { path: '**', component: FormComponent },
      { path: '', component: FormComponent },
    ]),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
