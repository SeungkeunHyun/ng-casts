import { Component, OnInit, ViewChild } from '@angular/core';
import { Cast } from 'src/app/core/models/cast';
import { Episode } from 'src/app/core/models/episode';
import { HttpService } from 'src/app/core/services/http.service';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { PlayService } from 'src/app/core/services/play.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('dv') dv;
  casts: Cast[];
  hiddenColums = ['podcastID', 'feedURL', 'summary', 'imageURL', 'author', 'episodes'];
  cols: any[];
  responsiveOptions: any[];
  sortField: string;
  sortOrder: number;
  currentCast: Cast;
  flagEpisodeSidebar = false;
  episodes: Episode[];
  categories: any[];
  sortOptions: SelectItem[];
  loadedAt: Date;

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
    this.episodes = await this.client.getEpisodes(this.currentCast.podcastID);
    this.flagEpisodeSidebar = true;
    console.log("open episodelist", cast, this.flagEpisodeSidebar);
  }

  mergeCastInfo = {
    next: ([res1, res2]) => {
      let c: Cast[] = res1.hits.hits.map(it => it._source);
      let s: any[] = res2.aggregations.cast_summary.buckets;
      c.map(i => {
        let si = s.find(si => si.key == i.podcastID);
        const now = new Date();
        if (now < new Date(si.lastPub.value_as_string)) {
          i.lastPubAt = si.lastPub.value_as_string.replace(/Z$/, '');
        } else {
          i.lastPubAt = si.lastPub.value_as_string;
        }
        i.episodes = si.doc_count;
      });
      c.sort((a: Cast, b: Cast) => { return a.lastPubAt < b.lastPubAt ? 1 : -1 });
      c.forEach(item => item.summary = item.summary.replace(/<[^>]*>?/gm, ''));
      this.casts = c;
      this.client.setCasts(c);
      this.categories = [...new Set(c.map(it => it.category))].map(it => { return { label: it, value: it } });
      this.categories.unshift({ label: 'All', value: '' });
      this.cols = Object.keys(this.casts[0]).filter(k => !this.hiddenColums.includes(k)).map(k => { let item = { 'field': k, 'header': k }; return item; });
      console.log('casts', this.cols, this.casts);
    }
  }

  async ngOnInit() {
    this.client.fetchCasts().subscribe(this.mergeCastInfo);
    this.loadedAt = new Date(await this.client.getLastLoadedAt());
    this.playService.cast$.subscribe(async (cast) => await this.showEpisodes(cast));
    this.sortOptions = [
      { label: 'Lastet episode', value: '!lastPubAt' },
      { label: 'Oldest episode', value: 'lastPubAt' }
    ];
  }

  closeSidebar(opened: boolean) {
    this.flagEpisodeSidebar = opened;
  }

  onFilterChange(event) {
    console.log(event);
    this.dv.filter(event.value);
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  playEpisode(ep: Episode) {
    console.log(ep);
    this.playService.plugEpisode(ep);
  }
}
