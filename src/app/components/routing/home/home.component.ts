import { CastExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cast } from 'src/app/core/models/cast';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  casts: Cast[];
  cols: any[];
  constructor(private client:HttpService) { }

  async ngOnInit() {
    this.casts = await this.client.getCasts();
    this.cols = Object.keys(this.casts[0]).map(k => {let item = {'field': k, 'header': k}; return item;});
    console.log('casts', this.cols, this.casts)
  }

}
