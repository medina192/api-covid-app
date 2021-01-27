import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainStatisticsComponent } from './components/main-statistics/main-statistics.component';
import { SecondaryStatisticsComponent } from './components/secondary-statistics/secondary-statistics.component';
import { MainChartComponent } from './components/main-chart/main-chart.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './components/chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainStatisticsComponent,
    SecondaryStatisticsComponent,
    MainChartComponent,
    ItemListComponent,
    MainComponentComponent,
    ChartComponent,
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ScrollingModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
