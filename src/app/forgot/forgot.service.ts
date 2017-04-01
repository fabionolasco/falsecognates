import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { HttpService } from '../commons/http.service';

@Injectable()
export class ForgotService {

  constructor(
    private _http: Http,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  sendForgotRequest(formValues) {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.post(this._httpService.baseUrl + 'users/reset', JSON.stringify(formValues), options);
  }

  OnInit() { }

}
