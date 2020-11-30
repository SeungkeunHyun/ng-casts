import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-casts';
  items: MenuItem[];
  activeItem: MenuItem;

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'home' },
      { label: 'Bookmarks', icon: 'pi pi-fw pi-bookmark', routerLink: 'bookmark' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil', routerLink: 'edit' },
      { label: 'Config', icon: 'pi pi-fw pi-cog', routerLink: 'config' }
    ];
    this.activeItem = this.items[0];
  }
}
