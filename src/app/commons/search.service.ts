import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { HttpService } from './http.service';

@Injectable()
export class SearchService {

  public results = [];
  public count = 0;
  public thisPage = 1;
  public itemsPerPage = 30;
  public totalPages = 0;
  public pagesRange = [];
  public searchType = '';

  constructor(
    private _http: Http,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  setResults(results) {
    this.results = results;
  }

  getTopTerms() {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.get(this._httpService.baseUrl + 'terms/top-terms', options);
  }

  searchByTerm (searchParams) {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.post(this._httpService.baseUrl + 'terms/search-terms-by-term-name', JSON.stringify(searchParams), options);
  }

  searchById(searchParams) {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.get(this._httpService.baseUrl + 'terms/' + searchParams.termId, options);
  }

  searchByLanguages(searchParams) {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.post(this._httpService.baseUrl + 'terms/search-by-languages', JSON.stringify(searchParams), options);
  }

  searchByLanguagesUserId(searchParams) {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.post(this._httpService.baseUrl + 'terms/search-by-languages-userid', JSON.stringify(searchParams), options);
  }

  countTermsByLanguage(searchParams) {
    let options = new RequestOptions({ headers: this._httpService.queryHeaders });
    return this._http.post(this._httpService.baseUrl + 'terms/count-terms-by-languages', JSON.stringify(searchParams), options);
  }

  OnInit() { }

}
