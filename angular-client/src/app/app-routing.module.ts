import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ChargingPageComponent from 'src/pages/charging-page/charging-page.component';
import GraphPageComponent from 'src/pages/graph-page/graph-page.component';
import LandingPageComponent from 'src/pages/landing-page/landing-page.component';
import MapComponent from 'src/pages/map/map.component';

const routes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'graph', component: GraphPageComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'map', component: MapComponent },
  { path: 'charging', component: ChargingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
