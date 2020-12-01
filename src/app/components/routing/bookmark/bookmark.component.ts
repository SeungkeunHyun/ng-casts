import { Component, OnInit } from '@angular/core';
import { Episode } from 'src/app/core/models/episode';
import { HttpService } from 'src/app/core/services/http.service';
import { PlayService } from 'src/app/core/services/play.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  bookmarks: any = [];
  jsonBM: any;
  constructor(private client: HttpService, private playService: PlayService) { }
  ngOnInit(): void {
    const strBM = localStorage.getItem("bookmarks")
    if (!strBM) {
      return;
    }
    this.jsonBM = JSON.parse(strBM);
    const bookmarks: any[] = Object.values(this.jsonBM).sort((a: Episode, b: Episode) => a.stoppedAt < b.stoppedAt ? 1 : -1);
    for (var bookmark of bookmarks) {
      this.bookmarks.push({ cast: this.client.getCast(bookmark.cast_episode), episode: bookmark });
    }
    console.log(this.bookmarks);
  }
  playBookmark(bm: any) {
    console.log("bookmark", bm);
    this.playService.plugEpisode(bm.cast, bm.episode);
  }
  deleteBookmark(bm: any) {
    console.log(bm);
    this.bookmarks = this.bookmarks.filter(it => it.episode.episodeID != bm.episode.episodeID);
    delete this.jsonBM[bm.episode.episodeID];
    localStorage.setItem("bookmarks", JSON.stringify(this.jsonBM));
  }
}
