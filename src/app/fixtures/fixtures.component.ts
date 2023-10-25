import { Component, OnInit } from '@angular/core';
import { ApiFootballService } from '../services/api-football.service';
import { FixtureResponse, FixtureResult } from '../models/fixture';
import { UnsubscribeAdapterService } from '../common/unsubscribe-adapter.service';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Standing } from '../models/standing';
import { CacheService } from '../common/cache.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit, UnsubscribeAdapterService {
  fixtures: FixtureResult[] =  [];
  subs: SubSink = new SubSink();
  leagueId: number = 0;
  teamId: number = 0;
  data!: Standing[] | FixtureResult[] | string | number;
  private cacheSubscription: Subscription = new Subscription();

  constructor(public apiFootballService: ApiFootballService,private route: ActivatedRoute, private location: Location,
    private cacheService: CacheService) {

  }

  ngOnInit(): void {
    this.cacheSubscription = this.cacheService.cache$.subscribe(data => {
      this.data = data;
    });
    this.route.queryParamMap.subscribe(params => {
      this.leagueId = Number(params.get('leagueId'))
      this.teamId = Number(params.get('teamId'))
      this.loadData();
    })
  }
  loadData(): void {
    let current = this.cacheService.get(this.leagueId + '-fixtures-' + this.teamId)
    if(current){
      this.fixtures = current as FixtureResult[];
      return;
    }
    this.subs.add(this.apiFootballService.getFixtures(this.leagueId, this.teamId)
    .subscribe(response => {
      this.fixtures = response.response
      this.cacheService.set(this.leagueId + '-fixtures-' + this.teamId, this.fixtures)
    }))
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.cacheSubscription.unsubscribe();
  }

}
