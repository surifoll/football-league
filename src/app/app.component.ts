import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  england: number = environment.premier_league
  spain: number = environment.la_lila
  germany: number = environment.bundesliga
  france: number = environment.ligue_1
  italy: number = environment.serie_a
  title = 'football-league';
}
