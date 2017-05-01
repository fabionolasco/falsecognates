import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../commons/languages.service';
import { UserService } from '../commons/user.service';
import { HeaderService } from '../commons/header.service';
import { SuggestService } from './suggest.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss']
})
export class SuggestComponent implements OnInit {

  public mySource: Array<string> = [];
  public alertMessage = '';
  public successMessage = '';
  public canSubmit = true;
  public preExistent: any = false;
  public data;

  constructor(
    public LanguagesService: LanguagesService,
    private _UserService: UserService,
    private _HeaderService: HeaderService,
    private _SuggestService: SuggestService
  ) {
    this._HeaderService.headerSize = 'small';
    // Prepare Suggestion Data
    this.cleanModels();
    // Brings data back if not submited yet
    let data = this._SuggestService.getTmpData();
    if (data) {
      this.data = data;
    }
  }

  ngOnInit() {
    this.LanguagesService
      .getLanguages()
      .then(data => {
        this.mySource = data;
      });
  }

  storeTmpData() {
      this._SuggestService.storeTmpData(this.data);
  }

  capitalize(w: string) {
    setTimeout(() => {
      let val = this.data[w];
      this.data[w] = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    }, 10);
  }

  submitFalseCognate() {
    if (!this.data.accepted) {
      this.alertMessage = 'You need to accept our Terms and Agreements to submit content to the website.';
    } else
    if (!this.LanguagesService.searchForLanguage(this.data.lang1)) {
      this.alertMessage = 'Please select a correct language.';
      this.data.lang1 = '';
    } else
    if (!this.LanguagesService.searchForLanguage(this.data.lang2)) {
      this.alertMessage = 'Please select a correct language.';
      this.data.lang2 = '';
    } else
    if (!this.data.word1 || this.data.word1.length < 1) {
      this.alertMessage = 'Please enter a valid word.';
    } else
    if (!this.data.word2 || this.data.word2.length < 1) {
      this.alertMessage = 'Please enter a valid word.';
    } else
    if (!this.data.native1 || this.data.native1.length < 1) {
      this.alertMessage = 'Please select a valid definition.';
    } else
    if (!this.data.native2 || this.data.native2.length < 1) {
      this.alertMessage = 'Please select a valid definition.';
    } else {
      let tmpData = Object.assign({}, this.data);
      this.canSubmit = false;
      this._SuggestService.sendSuggestion(tmpData)
        .subscribe((data) => {
            this.cleanModels();
            this._SuggestService.clearAll();
            this.successMessage = 'Awesome! Thank you for your collaboration!';
            this.canSubmit = true;
          }, (error) => {
            this.alertMessage = error.json().error.message;
            this._UserService.logout();
            this.canSubmit = true;
          });
    }
    document.body.scrollTop = 0;
  }

  cleanModels() {
    this.canSubmit = true;
    this.data = {
      accepted: false,
      lang1: '',
      lang2: '',
      word1: '',
      word2: '',
      native1: '',
      native2: '',
      meaning1: '',
      meaning2: ''
    };
  }

  myListFormatter(data: any): string {
    return `<strong>${data['language_name']}</strong>(${data['native_name']})`;
  }

  checkForPreExisting() {
    const searchParams = {
      l1: this.data.lang1,
      l2: this.data.lang2,
      w1: this.data.word1,
      w2: this.data.word2
    };
    this._SuggestService.checkPreExistend(searchParams)
      .map((resp) => { return JSON.parse(resp['_body'])[0]; })
      .subscribe(
        (resp) => {
          this.preExistent = resp;
        }
      );
  }

  clearPreExisting() {
    this.preExistent = [];
  }

}
