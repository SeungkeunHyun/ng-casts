import { Component, OnInit } from '@angular/core';
import { Cast } from 'src/app/core/models/cast';
import { HttpService } from 'src/app/core/services/http.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  casts: Cast[];
  hiddenColums = ['podcastID', 'feedURL', 'summary', 'imageURL'];
  cols: any[];
  responsiveOptions;

  constructor(private client: HttpService, private primengConfig: PrimeNGConfig) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  showEpisodes(cast) {
    console.log(cast);
  }

  async ngOnInit() {
    this.casts = await this.client.getCasts();
    this.cols = Object.keys(this.casts[0]).filter(k => !this.hiddenColums.includes(k)).map(k => { let item = { 'field': k, 'header': k }; return item; });
    console.log('casts', this.cols, this.casts)
  }

}
