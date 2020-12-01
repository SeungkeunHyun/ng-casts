import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { HomeComponent } from './components/routing/home/home.component';
import { EditComponent } from './components/routing/edit/edit.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/parts/sidebar/sidebar.component';
import { CommonModule } from "@angular/common";
import { PlayerComponent } from './components/parts/player/player.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ConfigComponent } from './routing/config/config.component';
import { BookmarkComponent } from './components/routing/bookmark/bookmark.component';
import { DurationPipe } from './core/pipes/duration.pipe';
import { ConcatPipe } from './core/pipes/concat.pipe';
import { SincePipe } from './core/pipes/since.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    SidebarComponent,
    PlayerComponent,
    ConfigComponent,
    BookmarkComponent,
    DurationPipe,
    ConcatPipe,
    SincePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TabMenuModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    CardModule,
    CarouselModule,
    DataViewModule,
    OrderListModule,
    SidebarModule,
    CommonModule,
    DropdownModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
