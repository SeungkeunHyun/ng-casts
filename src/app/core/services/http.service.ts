import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cast } from '../models/cast';
import { environment } from '../../../environments/environment'
import { map, catchError } from 'rxjs/operators';
import { EsResponse } from '../models/es-response';
import { forkJoin, Observable } from 'rxjs';
import { Episode } from '../models/episode';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers: HttpHeaders;
  casts: Cast[];
  castCache = {};
  lastLoadedAt = new Date('1970-01-01');
  castQuery = {
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

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(environment.esUsername + ':' + environment.esPassword) });
  }

  setCasts(casts: Cast[]) {
    this.casts = casts;
  }

  setCastCache(castId: string, episodes: Episode[]) {
    this.castCache[castId] = episodes;
  }

  async getCachedEpisodes(castId: string): Promise<Episode[]> {
    if (!this.castCache.hasOwnProperty(castId)) {
      this.setCastCache(castId, await this.getEpisodes(castId));
    }
    return this.castCache[castId];
  }

  getCasts() {
    return this.casts;
  }

  getCast(castId: string) {
    return this.casts.find(i => i.podcastID == castId);
  }

  getLastLoadedAt() {
    const qry = {
      "size": 0,
      "aggs": {
        "latest_load": {
          "max": { "field": "load_timestamp" }
        }
      }
    }
    return this.http.post(`${environment.esHost}/casts/_search`, qry, { headers: this.headers }).pipe(map((dat: EsResponse) => dat.aggregations.latest_load.value_as_string.replace(/Z$/, ''))).toPromise();
  }

  fetchCasts() {
    console.log(this.headers);
    let qry = { query: { exists: { field: 'podcastID' } } };
    const casts: Observable<EsResponse> = this.http.post<EsResponse>(`${environment.esHost}/casts/_search?size=200`, qry, { headers: this.headers });
    const summaries: Observable<EsResponse> = this.http.post<EsResponse>(`${environment.esHost}/casts/_search?size=0`, this.castQuery, { headers: this.headers });
    return forkJoin([casts, summaries]);
  }

  getEpisodes(castId) {
    let epQuery = {
      size: 10000,
      query: {
        term: {
          "cast_episode.keyword": castId
        }
      },
      "sort": {
        "pubDate": { "order": "desc" }
      }
    }
    const nowDate = new Date();
    return this.http.post(`${environment.esHost}/casts/_search`, JSON.stringify(epQuery), { headers: this.headers }).pipe(map((dat: EsResponse) => dat.hits.hits.map(item => item._source))).toPromise();
  }
}