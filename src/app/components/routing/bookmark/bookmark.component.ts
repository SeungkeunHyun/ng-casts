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
  constructor(private client: HttpService, private playService: PlayService) { }
  ngOnInit(): void {
    const bm = localStorage.getItem("bookmarks")
    if (!bm) {
      return;
    }
    const jsonBM = JSON.parse(bm);
    for (var k of Object.keys(jsonBM)) {
      this.bookmarks.push({ cast: this.client.getCast(jsonBM[k].cast_episode), episode: jsonBM[k] });
    }
    console.log(this.bookmarks);
  }
  playBookmark(bm: any) {
    console.log("bookmark", bm);
    this.playService.plugEpisode(bm.cast, bm.episode);
  }
}
