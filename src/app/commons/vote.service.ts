import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpService } from './http.service';


@Injectable()
export class VotesService {

  public voted = new BehaviorSubject<Date>(new Date());

  constructor(
    private _http: Http,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  get voting() {
    return this.voted.asObservable();
  }

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
