import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { MessagesService } from '../commons/messages.service';
import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';

@Injectable()
export class LanguagesService {

  private langUrl: string;
  public langs = [];
  public acronyms = {};

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

  getLanguages(): any {
    let tmp: any = localStorage.getItem('languages');
    if (this.langs.length) {
      // Return content local var
      return  new Promise((resolve) => {
        resolve(this.langs);
      });
    } else
    if (tmp) {
      // Return content from local storage
      return  new Promise((resolve) => {
        this.langs = JSON.parse(tmp);
        this.acronyms = JSON.parse(localStorage.getItem('acronyms'));
        resolve(this.langs);
      });
    } else {
      // Request data from server
      return this._http.get(this.langUrl)
        .toPromise()
        .then((response: Response) => {
          localStorage.setItem('languages', JSON.stringify(response.json()));
          this.langs = response.json();
          this.acronymsObject(this.langs);
          return new Promise((resolve) => {
            resolve(this.langs);
          });
        });
    }
  }

  acronymsObject(arr) {
    let count = arr.length;
    for (let i = 0; i < count; i++) {
      this.acronyms[arr[i].language_name] = Object.assign({}, arr[i]);
    }
    localStorage.setItem('acronyms', JSON.stringify(this.acronyms));
  }

  getAcronym(lang) {
    return this.acronyms[lang].acronym;
  }

}
