import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './components/routing/edit/edit.component';
import { HomeComponent } from './components/routing/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'edit', component: EditComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
