import { Component, OnInit } from '@angular/core';
import { Cast } from 'src/app/core/models/cast';
import { Episode } from 'src/app/core/models/episode';
import { HttpService } from 'src/app/core/services/http.service';
import { PrimeNGConfig } from 'primeng/api';
import { PlayService } from 'src/app/core/services/play.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  casts: Cast[];
  hiddenColums = ['podcastID', 'feedURL', 'summary', 'imageURL', 'author', 'episodes'];
  cols: any[];
  responsiveOptions: any[];
  sortField = 'pubDate';
  sortOrder = 'desc';
  currentCast: Cast;
  flagEpisodeSidebar = false;
  episodes: Episode[];

  constructor(private client: HttpService, private playService: PlayService, private primengConfig: PrimeNGConfig) {
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

  async showEpisodes(cast) {
    this.currentCast = cast;
    console.log(this.currentCast);
    this.episodes = await this.client.getEpisodes(this.currentCast.podcastID);
    this.flagEpisodeSidebar = true;
  }

  mergeCastInfo = {
    next: ([res1, res2]) => {
      let c: Cast[] = res1.hits.hits.map(it => it._source);
      let s: any[] = res2.aggregations.cast_summary.buckets;
      c.map(i => {
        let si = s.find(si => si.key == i.podcastID);
        console.log(i, si);
        i.lastPubAt = si.lastPub.value_as_string;
        i.episodes = si.doc_count;
      });
      c.sort((a: Cast, b: Cast) => { return a.lastPubAt < b.lastPubAt ? 1 : -1 });
      this.casts = c;
      console.log(this.casts);
      this.cols = Object.keys(this.casts[0]).filter(k => !this.hiddenColums.includes(k)).map(k => { let item = { 'field': k, 'header': k }; return item; });
      console.log('casts', this.cols, this.casts);
    }
  }

  async ngOnInit() {
    this.client.getCasts().subscribe(this.mergeCastInfo);
  }

  closeSidebar() {
    this.flagEpisodeSidebar = false;
  }

  playEpisode(ep: Episode) {
    console.log(ep);
    this.playService.plugEpisode(ep);
  }
}
