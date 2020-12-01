import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cast } from '../models/cast';
import { Episode } from '../models/episode';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  public cast$ = new Subject<Cast>();
  public episode$ = new Subject<Episode>();
  episodeInPlay: Episode;
  constructor() {

  }

  plugCast(cast: Cast) {
    this.cast$.next(cast);
  }

  getEpisodeInPlay() {
    return this.episodeInPlay;
  }

  plugEpisode(ep: Episode) {
    this.episode$.next(ep);
    this.episodeInPlay = ep;
  }
}
