import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { HttpService } from '../commons/http.service';

@Injectable()
export class SuggestService {

  public storedData = null;

  constructor(
    private _http: Http,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  sendSuggestion(data) {
    this.storedData = data;
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http
        .post(this._httpService.baseUrl + 'terms', JSON.stringify(data), options);
  }

  storeTmpData(data: Object) {
    localStorage.setItem('suggestion', JSON.stringify(data));
  }

  getTmpData(): Object|boolean {
    let data = localStorage.getItem('suggestion');
    return data ? JSON.parse(data) : false;
  }

  checkPreExistend(searchParams) {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.post(this._httpService.baseUrl + 'terms/existing-terms', JSON.stringify(searchParams), options);
  }

  clearAll() {
    this.storedData = null;
  }

  OnInit() { }

}
