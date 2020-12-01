import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Episode } from 'src/app/core/models/episode';
import { PlayService } from 'src/app/core/services/play.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() episodes: Episode[];
  @Input() position: string;
  @Input() display: boolean;
  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() playEvent = new EventEmitter<Episode>();
  episodeInPlay: Episode;
  cols = ['pubDate', 'title', 'duration']
  scrollHeight = '400px'
  constructor(private playService: PlayService) {
  }

  playEpisode(ep) {
    console.log(ep);
    this.playEvent.emit(ep);
  }

  ngOnInit(): void {
    this.episodeInPlay = this.playService.getEpisodeInPlay();
  }

  setTableData() {
    //this.cols = Object.keys(this.episodes[0]).filter(it => !['mediaURL', 'description', 'episodeID', 'cast_episode', 'summary'].includes(it));
    this.scrollHeight = window.innerHeight - 50 + 'px';
    console.log(this.scrollHeight);
  }

  disposeAll() {
    this.episodes = null;
    console.log("closing");
    this.closeEvent.emit(false);
  }


}
