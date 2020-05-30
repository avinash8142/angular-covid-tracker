import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldComponent } from './world/world.component';
import { IndiaComponent } from './india/india.component';
import { StateComponent } from './state/state.component';

const routes: Routes = [
  { path: 'world', component: WorldComponent },
  { path: 'india', component: IndiaComponent },
  { path:'state', component: StateComponent},
  { path: '**', component: IndiaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { } 
// export const 
// RoutingComponent = [WorldComponent, IndiaComponent];
