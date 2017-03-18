import { Component, OnInit, ViewChildren, AfterViewInit } from '@angular/core';
import { LanguagesService } from '../commons/languages.service';
import { MessagesService } from '../commons/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, AfterViewInit {

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

  myCallback(data: any, lang: string): void {
    console.log(typeof data, data);
    // if (!this.LanguagesService.searchForLanguage(data)) {
    //   this.searchParams.data[lang] = '';
    // } else {
    //   console.log(data, lang, this.searchParams);
    //     if (lang === 'lang1') {
    //       document.getElementById('myDataField2').focus();
    //     } else if (lang === 'lang2') {
    //       document.getElementById('search-button').focus();
    //     }
    // }
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

  ngAfterViewInit() {
    // this.lang1.first.nativeElement.focus();
  }

  ngOnInit() {
    this.LanguagesService
      .getLanguages()
      .then(data => {
        console.log(data);
        this.mySource = data;
      });
  }

}
