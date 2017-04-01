import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { MessagesService } from '../commons/messages.service';
import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';

@Injectable()
export class LanguagesService {

  private langUrl: string;
  public langs;

  constructor(private _http: Http, private _httpService: HttpService, private _messagesService: MessagesService) {
    this.langUrl = this._httpService.baseUrl + 'languages';
    this.getLanguages();
  }

  searchForLanguage(langName) {
    let x = this.langs.length;
    for (let i = 0; i < x; i++) {
      if (this.langs[i]['language_name'] === langName) {
        this._messagesService.message = '';
        return true;
      }
    }
    this._messagesService.message = 'One more language names were incorrect!';
    return false;
  }

  getUserData() {
    let urlParams = document.location.href.split('?');
    let url = this._httpService.baseUrl + '/user/session?oauth_callback=true&' + urlParams[1];

    this._http.post(url, {})
        .subscribe(function(response: Response){
          // console.log('attempt call', response);
        });
  }

  getLanguages(): any {
    let tmp: any = localStorage.getItem('languages');
    if (tmp) {
      // console.log('Got from localStorage', tmp);
      return  new Promise((resolve) => {
        this.langs = JSON.parse(tmp);
        resolve(this.langs);
      });
    } else {
      return this._http.get(this.langUrl)
        .toPromise()
        .then(function(response: Response){
          console.log('Got languages from server :: ', response.json());
          localStorage.setItem('languages', JSON.stringify(response.json()));
          return new Promise((resolve) => {
            this.langs = response.json();
            resolve(this.langs);
          });
        });
    }
  }


}
