import { Component, OnInit } from '@angular/core';
import { UnsubscribeAdapterService } from '../common/unsubscribe-adapter.service';
import { SubSink } from 'subsink';
import { ApiFootballService } from '../services/api-football.service';
import { Standing } from '../models/standing';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '../common/cache.service';
import { Subscription } from 'rxjs';
import { FixtureResult } from '../models/fixture';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, UnsubscribeAdapterService {
  subs: SubSink = new SubSink();
  standings: Standing[] = [];
  league: number = 39
  data!: Standing[] | FixtureResult[] | string | number;
  private cacheSubscription: Subscription = new Subscription();

  constructor(private apiFootballService: ApiFootballService,
    private route: ActivatedRoute,
    private cacheService: CacheService) {

  }

  ngOnInit(): void {

    // We subscribe to the BehaviorSubject in the cache service to receive data updates.
    this.cacheSubscription = this.cacheService.cache$.subscribe(data => {
      this.data = data;
    });
    this.route.queryParamMap.subscribe(params => {
      this.league = Number(params.get('league'))
      this.league = this.league == 0 ? 39 : this.league;
      this.loadData();
    })
    this.loadData();
  }
  loadData(): void {
    let cachedCurrent = this.cacheService.get(this.league + '-current');
    if(cachedCurrent)
    {
      let cachedStandings = this.cacheService.get(this.league + '-standing-' + cachedCurrent)
      if (cachedStandings) {
        this.standings = cachedStandings as Standing[];
        return;
      }
    }

    this.subs.add(this.apiFootballService.getCurrentLeague(this.league).subscribe((response) => {
      let currentLeague = 0;
      currentLeague = response[0]?.seasons[0]?.year ?? 0;
      this.cacheService.set(this.league + '-current', currentLeague);

      let cachedStandings = this.cacheService.get(this.league + '-standing-' + currentLeague)
      if (cachedStandings) {
        this.standings = cachedStandings as Standing[];
        return;
      }
      this.subs.add(
        this.apiFootballService.getStandings(this.league, currentLeague).subscribe(response => {
          this.standings = response.response[0]?.league?.standings[0];
          this.cacheService.set(this.league + '-standing-' + currentLeague, this.standings)
        })
      );
    }))
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.cacheSubscription.unsubscribe();
  }
}
