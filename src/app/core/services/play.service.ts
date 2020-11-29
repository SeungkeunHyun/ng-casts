import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Episode } from '../models/episode';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  episode = new Subject<Episode>();
  constructor() {

  }

  plugEpisode(ep: Episode) {
    this.episode.next(ep);
  }
}
