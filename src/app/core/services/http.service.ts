import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cast } from '../models/cast';
import { environment } from '../../../environments/environment'
import { map, catchError } from 'rxjs/operators';
import { EsResponse } from '../models/es-response';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(environment.esUsername + ':' + environment.esPassword) });
  }
  getCasts() {
    console.log(this.headers);
    let qry = { query: { exists: { field: 'podcastID' } } };
    let aggqry = {
      "aggs": {
        "cast_summary": {
          "terms": {
            "field": "cast_episode.keyword",
            "size": 200
          },
          "aggs": {
            "lastPub": {
              "max": {
                "field": "pubDate"
              }
            }
          }
        }
      }
    }
    const casts: Observable<EsResponse> = this.http.post<EsResponse>(`${environment.esHost}/casts/_search?size=200`, qry, { headers: this.headers });
    const summaries: Observable<EsResponse> = this.http.post<EsResponse>(`${environment.esHost}/casts/_search?size=0`, aggqry, { headers: this.headers });
    return forkJoin([casts, summaries]);
  }
}