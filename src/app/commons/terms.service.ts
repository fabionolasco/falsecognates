import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';

@Injectable()
export class TermsService {

  constructor(
    private _http: Http,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  getTopTerms() {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.get(this._httpService.baseUrl + 'terms/top-terms', options);
  }

  OnInit() { }

}
