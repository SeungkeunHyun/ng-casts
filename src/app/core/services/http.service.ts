import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cast } from '../models/cast';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  restHost = 'http://skhyun.pe.hu';
  restPage = 'php/rest-sqlite/index.php';
  constructor(private http: HttpClient) { }

  getCasts() {
    return this.http.get<Cast[]>(`${this.restHost}/${this.restPage}/v_casts`).toPromise();
  }
}