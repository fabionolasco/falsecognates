import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { HttpService } from './http.service';

@Injectable()
export class VotesService {

  constructor(
    private _http: Http,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  sendVote(formValues) {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.post(this._httpService.baseUrl + 'votes/voting', JSON.stringify(formValues), options);
  }

  getVotes(termsIds) {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    let data = {
      termsIds: termsIds
    };
    return this._http.post(this._httpService.baseUrl + 'votes/get-votes', JSON.stringify(data), options);
  }

  OnInit() { }

}
