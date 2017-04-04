import { Component, OnInit, ViewChildren } from '@angular/core';
import { LanguagesService } from '../commons/languages.service';
import { MessagesService } from '../commons/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public mySource: Array<string> = [];
  public canSearch: number = 0;
  public searchParams: any = {
    pHolder: { lang1: 'Language 1...', lang2: 'Language 2...' } ,
    data: { lang1: '', lang2: '' },
    term: ''
  };

  constructor(
    public LanguagesService: LanguagesService,
    public MessagesService: MessagesService,
    private _router: Router
  ) { }

  validateLangs() {
    if (!this.LanguagesService.searchForLanguage(this.searchParams.data.lang1)) {
      this.searchParams.data.lang1 = '';
    }
    if (!this.LanguagesService.searchForLanguage(this.searchParams.data.lang2)) {
      this.searchParams.data.lang2 = '';
    }
  }

  searchByTerm() {
    let stored: string = window.localStorage.getItem('search-terms');
    let lTerms: any = { terms: [] };
    if (stored) {
      lTerms = JSON.parse(stored);
    }
    if (lTerms.terms.length >= 10) {
      lTerms.terms.splice(9, 1);
    }
    lTerms.terms.push(this.searchParams.term);
    localStorage.setItem('search-terms', JSON.stringify(lTerms));
    this._router.navigate(['/search-term/' + this.searchParams.term]);
  }

  searchByLanguages() {
    this.validateLangs();
    if (!this.searchParams.data.lang1 || !this.searchParams.data.lang2) {
      this.MessagesService.message = 'Please select correct languages.';
      return;
    }
    let stored: string = window.localStorage.getItem('search-languages');
    let lTerms: any = { languages: [] };
    if (stored) {
      lTerms = JSON.parse(stored);
    }
    if (lTerms.languages.length >= 10) {
      lTerms.languages.splice(9, 1);
    }
    lTerms.languages.push({
      lang1: this.searchParams.data.lang1,
      lang2: this.searchParams.data.lang2
    });
    localStorage.setItem('search-languages', JSON.stringify(lTerms));
    this._router.navigate(['/search-languages/' + this.searchParams.data.lang1 + '/' + this.searchParams.data.lang2]);
  }

  myListFormatter(data: any): string {
    return `<strong>${data['language_name']}</strong>(${data['native_name']})`;
  }

  ngOnInit() {
    this.LanguagesService
      .getLanguages()
      .then(data => {
        this.mySource = data;
      });
  }

  goToLang2() {
    setTimeout(() => {
      document.getElementById('myDataField2').focus();
    }, 77);
  }

  goToButton() {
    setTimeout(() => {
      document.getElementById('search-button-lang').focus();
    }, 77);
  }

}
