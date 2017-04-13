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
  public loadedAcronyms = false;
  public sysLanguage = 'en';
  public websiteText;

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

  acronymsObject(arr) {
    // console.log('arr', arr);
    let count = arr.length;
    // console.log('arr', arr);
    for (let i = 0; i < count; i++) {
      this.acronyms[arr[i].language_name] = Object.assign({}, arr[i]);
      // console.log('arr[i].language_name', arr[i].language_name, arr[i]);
    }
    localStorage.setItem('acronyms', JSON.stringify(this.acronyms));
    // console.log('this.acronyms', this.acronyms);
    this.loadedAcronyms = true;
  }

  getLanguages(): any {
    let tmpLang: any = localStorage.getItem('languages');
    if (this.langs.length) {
      // Return content local var
      return  new Promise((resolve) => {
        let tmpAcron = localStorage.getItem('acronyms');
        // console.log('tmpLang', tmpLang);
        // console.log('tmpAcron', tmpAcron);
        this.acronyms = JSON.parse(tmpAcron);
        // console.log('here2', this.acronyms);
        this.loadedAcronyms = true;
        resolve(this.langs);
      });
    } else
    if (tmpLang) {
      // Return content from local storage
      return  new Promise((resolve) => {
        this.langs = JSON.parse(tmpLang);
        let tmpAcron = localStorage.getItem('acronyms');
        // console.log('tmpLang5555', tmpLang);
        // console.log('tmpAcron5555', tmpAcron);
        this.acronyms = JSON.parse(tmpAcron);
        // console.log('here233', this.acronyms);
        this.loadedAcronyms = true;
        resolve(this.langs);
      });
    } else {
      // Request data from server
      return this._http.get(this.langUrl)
        .toPromise()
        .then((response: Response) => {
          localStorage.setItem('languages', JSON.stringify(response.json()));
          this.langs = response.json();
          // console.log('llllo', this.langs);
          this.acronymsObject(this.langs);
          return new Promise((resolve) => {
            resolve(this.langs);
          });
        });
    }
  }

  getAcronym(lang) {
    return this.acronyms[lang].acronym;
  }

  translateSite() {
    let lang = this.sysLanguage.length === 2 ? this.sysLanguage : 'en';
    console.log('lang', lang);
    this._http.get('/assets/json/' + lang.toLowerCase() + '.json')
      .map((resp) => { console.log('resp', resp); return resp.json(); })
      .subscribe(
        (resp) => {
          this.websiteText = resp;
          console.log('this.websiteText', this.websiteText);
        }
      );
  }

}
