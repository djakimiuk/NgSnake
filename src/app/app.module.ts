import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSnakeModule } from 'ngx-snake';

import { AppComponent } from '../components/app.component';
import { FormComponent } from '../components/form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnakeComponent } from '../components/snake/snake.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HistoryComponent } from '../components/history/history.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { RouterModule } from '@angular/router';
import { HighscoresComponent } from '../components/highscores/highscores.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPlayersPipe } from './pipes/filter-players.pipe';
import { SortPlayersPipe } from './pipes/sort-players.pipe';
import { MyscoresComponent } from '../components/myscores/myscores.component';
import { PlayerDataGuard } from '../guards/player-data.guard';
import { Top10PlayersPipe } from './pipes/top10-players.pipe';
import { UniquePlayersPipe } from './pipes/unique-players.pipe';

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
    Top10PlayersPipe,
    UniquePlayersPipe,
  ],
  imports: [
    BrowserModule,
    NgxSnakeModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: FormComponent },
      {
        path: 'game/:color',
        canActivate: [PlayerDataGuard],
        component: SnakeComponent,
      },
      {
        path: 'history',
        canActivate: [PlayerDataGuard],
        component: HistoryComponent,
      },
      {
        path: 'scores',
        canActivate: [PlayerDataGuard],
        component: HighscoresComponent,
      },
      {
        path: 'myscores',
        canActivate: [PlayerDataGuard],
        component: MyscoresComponent,
      },
      { path: '**', redirectTo: '/welcome', pathMatch: 'full' },
      { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    ]),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
