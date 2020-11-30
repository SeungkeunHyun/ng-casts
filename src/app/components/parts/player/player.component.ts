import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cast } from 'src/app/core/models/cast';
import { Episode } from 'src/app/core/models/episode';
import { PlayService } from 'src/app/core/services/play.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @ViewChild('player') audioPlayer: ElementRef;
  player: HTMLAudioElement;
  episode: Episode;
  cast: Cast;
  constructor(private playService: PlayService) {

  }

  ngOnInit(): void {
    this.playService.episode.subscribe(ep => {
      this.cast = this.playService.currentCast();
      this.episode = ep;
    });
  }

  moveTo(secs: number) {
    document.querySelector("audio").currentTime += secs;
  }

  storeToStorage() {
    let bookmarks = {};
    if (localStorage.getItem("bookmarks") === null) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks[this.episode.episodeID] = this.episode;
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  getSavedFrame(epId: string) {
    if (localStorage.getItem("bookmarks") === null) {
      localStorage.setItem("bookmarks", JSON.stringify({}));
    }
    let bm: any = JSON.parse(localStorage.getItem("bookmarks"));
    console.log(bm);
    if (bm.hasOwnProperty(epId)) {
      return bm[epId].frame;
    }
    return 0;
  }

  setBookmark(seconds: number) {
    this.episode.frame = seconds;
    this.episode.stoppedAt = new Date();
    console.log("set bookmark at", seconds, this.episode);
    this.storeToStorage();
  }

  setupEvents(evt) {
    this.player = evt.target;
    const frame = this.getSavedFrame(this.episode.episodeID);
    if (frame > 0)
      this.player.currentTime = frame;
    this.player.onpause = this.player.onerror = e => this.setBookmark(this.player.currentTime);
    this.player.ontimeupdate = e => {
      //console.log(this.player.currentTime);
      let seconds = Math.floor(this.player.currentTime);
      if (seconds === 0) {
        return;
      }
      if (seconds % 5 === 0) {
        this.setBookmark(seconds);
      }
    }
  }

}
