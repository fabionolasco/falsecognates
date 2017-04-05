import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';

@Injectable()
export class UserService {

  public token: string = '';
  public urlBeforeLogin = ['', ''];
  public userSession;
  public userId;

  constructor(
    private _http: Http,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  register(formValues) {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.post(this._httpService.baseUrl + 'members', JSON.stringify(formValues), options);
  }

  login(formValues) {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.post(this._httpService.baseUrl + 'members/login', JSON.stringify(formValues), options);
  }

  getId() {
    return localStorage.getItem('userId');
  }

  storeToken(data) {
    let session = JSON.parse(data);
    localStorage.setItem('session', data);
    localStorage.setItem('session_token', session.id);
    localStorage.setItem('usedId', session.userId);
    this.userId = localStorage.getItem('userId');
    this._httpService.makeHeader();
    this._router.navigate([this.urlBeforeLogin[0]]);
  }

  isLoggedIn() {
    this.token = localStorage.getItem('session_token');
    this.userId = localStorage.getItem('userId');
    return (this.token && this.token.length > 32);
  }

  checkSessionStatus() {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    // return this._http.get(this._httpService.baseUrl + 'members/' + userId + '/accessTokens', options);
    return this._http.get(this._httpService.baseUrl + 'languages', options);
  }

  logout() {
    let token = localStorage.getItem('session_token');
    localStorage.removeItem('session');
    localStorage.removeItem('session_token');
    localStorage.removeItem('usedId');
    this.userId = null;
    this.token = '';
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.post(this._httpService.baseUrl + 'members/logout', '', options);
  }

  OnInit() { }

}
