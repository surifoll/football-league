
export interface StandingResponse {
  get:        string;
  parameters: Parameters;
  results:    number;
  paging:     Paging;
  response:   Response[];
}

export interface Paging {
  current: number;
  total:   number;
}

export interface Parameters {
  league: string;
  season: string;
}

export interface Response {
  league: League;
}

export interface League {
  id:        number;
  name:      Name;
  country:   string;
  logo:      string;
  flag:      string;
  season:    number;
  standings: Array<Standing[]>;
}

export enum Name {
  PremierLeague = "Premier League",
}

export interface Standing {
  rank:        number;
  team:        Team;
  points:      number;
  goalsDiff:   number;
  group:       Name;
  form:        string;
  status:      Status;
  description: null | string;
  all:         All;
  home:        All;
  away:        All;
  update:      string;
}

export interface All {
  played: number;
  win:    number;
  draw:   number;
  lose:   number;
  goals:  Goals;
}

export interface Goals {
  for:     number;
  against: number;
}

export enum Status {
  Same = "same",
}

export interface Team {
  id:   number;
  name: string;
  logo: string;
}
