import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import {MatTabsModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule}     from './app-routing.module';
import { WorldComponent } from './world/world.component';
import { IndiaComponent } from './india/india.component';
import { StateComponent } from './state/state.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    FontAwesomeModule,
   //MatTabsModule,
    FormsModule,
    AppRoutingModule,
    MatListModule
  ],
  declarations: [
    AppComponent,
    WorldComponent,
    IndiaComponent,
    StateComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
