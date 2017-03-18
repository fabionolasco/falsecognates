import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public sLangs;
  public sTerms;

  constructor(public _HeaderService: HeaderService) {
    this._HeaderService.headerSize = 'small';
  }

  ngOnInit() {
    let sLangs = window.localStorage.getItem('search-languages');
    if (!sLangs) {
      this.sLangs = {languages: []};
    } else {
      this.sLangs = JSON.parse(sLangs);
    }
    let sTerms = window.localStorage.getItem('search-terms');
    if (!sTerms) {
      this.sTerms = {terms: []};
    } else {
      this.sTerms = JSON.parse(sTerms);
    }
  }

}
