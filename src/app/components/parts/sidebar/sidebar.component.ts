import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Episode } from 'src/app/core/models/episode';

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
  cols = ['pubDate', 'title', 'duration']
  scrollHeight = '400px'
  constructor() {
  }

  playEpisode(ep) {
    console.log(ep);
    this.playEvent.emit(ep);
  }

  ngOnInit(): void {
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
