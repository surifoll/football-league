import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsComponent } from './standings/standings.component';
import { FixturesComponent } from './fixtures/fixtures.component';

const routes: Routes = [
  { path: '', component: StandingsComponent},
  { path: 'standing', component: StandingsComponent},
  { path: 'fixtures', component: FixturesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
