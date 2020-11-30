import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarkComponent } from './components/routing/bookmark/bookmark.component';
import { EditComponent } from './components/routing/edit/edit.component';
import { HomeComponent } from './components/routing/home/home.component';
import { ConfigComponent } from './routing/config/config.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'bookmark', component: BookmarkComponent },
  { path: 'edit', component: EditComponent },
  { path: 'config', component: ConfigComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
