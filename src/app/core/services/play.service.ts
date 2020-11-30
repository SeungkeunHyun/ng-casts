import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cast } from '../models/cast';
import { Episode } from '../models/episode';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  cast: Cast;
  episode = new Subject<Episode>();
  constructor() {

  }

  currentCast(): Cast {
    return this.cast;
  }

  plugEpisode(cast: Cast, ep: Episode) {
    this.cast = cast;
    this.episode.next(ep);
  }
}
