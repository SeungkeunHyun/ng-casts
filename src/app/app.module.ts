import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { HomeComponent } from './components/routing/home/home.component';
import { EditComponent } from './components/routing/edit/edit.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    TabMenuModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    CardModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
