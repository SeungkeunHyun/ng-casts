import { Component, Input, OnInit } from '@angular/core';
import { Episode } from 'src/app/core/models/episode';
import { PlayService } from 'src/app/core/services/play.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  episode: Episode;
  constructor(private playService: PlayService) {
    this.playService.episode.subscribe(ep => this.playEpisode(ep));
  }

  ngOnInit(): void {
  }

  playEpisode(ep: Episode) {
    this.episode = ep;
    console.log(this.episode);
  }

}
