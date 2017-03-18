import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../commons/languages.service';
import { UserService } from '../commons/user.service';
import { HeaderService } from '../header/header.service';
import { SuggestService } from './suggest.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {

  public mySource: Array<string> = [];
  public alertMessage = '';
  public successMessage = '';
  public canSubmit = true;
  public data = {
    lang1: '',
    lang2: '',
    word1: '',
    word2: '',
    meaning1: '',
    meaning2: ''
  };

  constructor(
    private _LanguagesService: LanguagesService,
    private _UserService: UserService,
    private _HeaderService: HeaderService,
    private _SuggestService: SuggestService
  ) {
    this._HeaderService.headerSize = 'small';
    if (this._SuggestService.storedData) {
      this.data = this._SuggestService.storedData;
    }
  }

  capitalize(w: string) {
    setTimeout(() => {
      let val = this.data[w];
      this.data[w] = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    }, 10);
  }

  submitFalseCognate() {
    if (!this._LanguagesService.searchForLanguage(this.data.lang1)) {
      this.alertMessage = 'Please select a correct language.';
      this.data.lang1 = '';
    } else
    if (!this._LanguagesService.searchForLanguage(this.data.lang2)) {
      this.alertMessage = 'Please select a correct language.';
      this.data.lang2 = '';
    } else
    if (!this.data.word1 || this.data.word1.length < 1) {
      this.alertMessage = 'Please enter a valid word.';
    } else
    if (!this.data.word2 || this.data.word2.length < 1) {
      this.alertMessage = 'Please enter a valid word.';
    } else
    if (!this.data.meaning1 || this.data.meaning1.length < 1) {
      this.alertMessage = 'Please select a valid definition.';
    } else
    if (!this.data.meaning2 || this.data.meaning2.length < 1) {
      this.alertMessage = 'Please select a valid definition.';
    } else {
      console.log('this.data == ', this.data);
      let tmpData = Object.assign({}, this.data);
      this.canSubmit = false;
      this._SuggestService.sendSuggestion(tmpData)
        .subscribe((data) => {
            console.log('Submited content', data);
            this.cleanModels();
            this._SuggestService.clearAll();
            this.successMessage = 'Awesome! Thank you for your collaboration!';
            document.body.scrollTop = 0;
          }, (error) => {
            this.canSubmit = true;
            this.alertMessage = error.json().error.message;
            this._UserService.logout();
            document.body.scrollTop = 0;
          });
    }
  }

  cleanModels() {
    this.canSubmit = true;
    this.data = {
      lang1: '',
      lang2: '',
      word1: '',
      word2: '',
      meaning1: '',
      meaning2: ''
    };
  }

  myListFormatter(data: any): string {
    return `<strong>${data['language_name']}</strong>(${data['native_name']})`;
  }

  ngOnInit() {
    this._LanguagesService
      .getLanguages()
      .then(data => {
        this.mySource = data;
      });
  }

}
