import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Standing, StandingResponse } from '../models/standing';
import { Observable, filter, map, shareReplay, switchMap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentSeasonResponse, Response } from '../models/currentSeason';
import { FixtureResponse } from '../models/fixture';

@Injectable({
  providedIn: 'root'
})
export class ApiFootballService {
  headers!: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.headers =
    new HttpHeaders({ 'x-rapidapi-host': environment.repidapi_host, 'x-rapidapi-key': environment.rapidapi_key });

  }

  getStandings(league: number, season: number): Observable<StandingResponse> {
    const url = `${environment.footbal_api}/standings?league=${league}&season=${season}`;
    return this.httpClient
      .get<StandingResponse>(url, { headers: this.headers })
      .pipe(shareReplay(1));
  }


  getCurrentLeague(leagueId: number): Observable<Response[]> {
    const url = `${environment.footbal_api}/leagues?current=true&id=${leagueId}&type=league`;
    return this.httpClient
      .get<CurrentSeasonResponse>(url, { headers: this.headers })
      .pipe(map(data => data.response.filter(val => val.league.id == leagueId),
        shareReplay(1)));
  }


  getFixtures(league: number, team: number): Observable<FixtureResponse> {
    const url = `${environment.footbal_api}/fixtures?league=${league}&team=${team}&status=FT&last=10`;
    return this.httpClient
      .get<FixtureResponse>(url, { headers: this.headers })
      .pipe(shareReplay(1));
  }

}
