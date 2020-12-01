import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cast } from 'src/app/core/models/cast';
import { Episode } from 'src/app/core/models/episode';
import { HttpService } from 'src/app/core/services/http.service';
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
  prevEntry: Episode;
  nextEntry: Episode;
  cast: Cast;
  constructor(private playService: PlayService, private client: HttpService) {

  }

  ngOnInit(): void {
    this.playService.episode$.subscribe(ep => {
      this.episode = ep;
      this.cast = this.client.getCast(ep.cast_episode);
    });
  }

  triggerEpisodeList(cast: Cast) {
    this.playService.plugCast(cast);
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

  deleteBookmark() {
    if (!localStorage.getItem("bookmarks")) {
      return;
    }
    let bm: any = JSON.parse(localStorage.getItem("bookmarks"));
    delete bm[this.episode.episodeID];
    localStorage.setItem("bookmarks", JSON.stringify(bm));
  }

  async setPrevNext() {
    const episodes = await this.client.getCachedEpisodes(this.episode.cast_episode);
    const idx = episodes.findIndex(it => it.episodeID === this.episode.episodeID);
    if (idx > 0) {
      this.prevEntry = episodes[idx - 1];
    }
    if (idx < episodes.length - 1) {
      this.nextEntry = episodes[idx + 1];
    }
    console.log(this.prevEntry, this.nextEntry);
  }

  togglePlayer() {
    if (this.player.paused) this.player.play();
    else this.player.pause();
  }

  playEpisode(ep: Episode) {
    this.playService.plugEpisode(ep);
  }

  setupEvents(evt) {
    this.player = evt.target;
    const frame = this.getSavedFrame(this.episode.episodeID);
    if (frame > 0)
      this.player.currentTime = frame;
    this.setPrevNext();
    this.player.onpause = this.player.onerror = e => this.setBookmark(this.player.currentTime);
    this.player.onended = e => this.deleteBookmark();
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
