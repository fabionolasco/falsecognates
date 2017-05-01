import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../commons/header.service';
import { SearchService } from '../commons/search.service';
import { LanguagesService } from '../commons/languages.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private routeSubs: any;
  public lang1: string = '';
  public lang2: string = '';
  public term: string = '';
  public collection = [];

  constructor(
    public HeaderService: HeaderService,
    private _route: ActivatedRoute,
    private _router: Router,
    public SearchService: SearchService,
    public LanguagesService: LanguagesService
  ) {
    this.HeaderService.headerSize = 'small';
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  changePage(e) {
    let url = '/' + this._route.url['_value'][0] + '/' + this._route.url['_value'][1] + '/' + this._route.url['_value'][2] + '/' + e;
    this._router.navigate([url]);
  }

  ngOnInit() {
    if (this._route.url['_value'].length < 3) {
      this.routeSubs = this._route.params.subscribe(params => {
        this.term = params['termVal'];
      });
    } else {
      this.routeSubs = this._route.params.subscribe(params => {
        this.lang1 = params['lang1'];
        this.lang2 = params['lang2'];
        this.SearchService.thisPage = parseInt(params['page'], 10);
      });
    }
  }

  ngOnDestroy() {
    this.routeSubs.unsubscribe();
  }

}
