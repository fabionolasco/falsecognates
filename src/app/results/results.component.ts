import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../commons/user.service';
import { MessagesService } from '../commons/messages.service';
import { VotesService } from '../commons/vote.service';
import { SearchService } from '../commons/search.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  public votes;
  public count;
  public userId;
  public totalRecords;
  public currentPage;
  public totalPages;
  public itemsPerPage;
  public routeSubs;
  public hasVoted;
  public isSearching = true;
  public isVoting: Subscription;

  constructor(
    public SearchService: SearchService,
    private _userService: UserService,
    private _messagesService: MessagesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _votesService: VotesService
  ) {
    // Listen for votes
    this.hasVoted = this._votesService.voting;
    this.isVoting = this.hasVoted
      .subscribe(
        () => { this.recountVotes(); }
      );
    // Prepare for Search
    this.itemsPerPage = this.SearchService.itemsPerPage;
    this.routeSubs = this._router.events.subscribe((route) => {
        if (route instanceof NavigationEnd) {
          this.search();
        }
    });

  }

  ngOnInit() { }

  ngOnDestroy() {
    this.routeSubs.unsubscribe();
  }

  checkVote(term_id): number {
    let result = 0;
    this.votes.forEach((vote) => {
      if (vote.term_id === term_id) {
        result = vote.vote_value;
      }
    });
    return result;
  }

  checkTerm(): void {
    // Change terms inside Term Array, and add vote value
    if (this.votes && this.votes.length > 0) {
      this.SearchService.results.forEach((term) => {
        if (!this.userId) {
          term.vote_value = 0;
        } else {
          let voteValue = this.checkVote(term.id);
          term.vote_value = this.checkVote(term.id);
        }
      });
    }
  }

  countTermsByLanguage() {
    let searchParams = {
      lang1: this._route.url['_value'][1].path,
      lang2: this._route.url['_value'][2].path
    };
    this.SearchService.countTermsByLanguage(searchParams)
      .subscribe(
        (data) => {
          this.SearchService.count = JSON.parse(data['_body'])[0][0]['totalTerms'];
        }
      );
  }

  recountVotes() {
    // Get Votes
    if (this.userId) {
      let termsIds = [];
      this.SearchService.results.forEach((term) => {
        termsIds.push(term.id);
      });
      let subsVote = this._votesService.getVotes(termsIds)
        .subscribe(
          (resp) => {
            this.votes = JSON.parse(resp['_body']);
            this.checkTerm();
            subsVote.unsubscribe();
          }
        );
    }
  }

  homePageTopTerms() {
    let subsTerms = this.SearchService.getTopTerms()
      .map((data) => { return JSON.parse(data['_body'])[0]; })
      .subscribe(
        (data) => {
          this.SearchService.results = data;
          this.recountVotes();
          subsTerms.unsubscribe();
          this.isSearching = false;
        }
      );
  }

  pagesRange(start, end) {
    const range = Array.from({length: ((end + 1) - start)}, (v, k) => k + start);
    return range;
  }

  searchByLanguages() {
    // Search By Languages
    const currentPage = this._route.url['_value'].length >= 4 ? parseInt(this._route.url['_value'][3].path, 10) : 1;
    let startPoint = (currentPage * this.SearchService.itemsPerPage) - this.SearchService.itemsPerPage;
    this.countTermsByLanguage();
    let searchParams = {
      lang1: this._route.url['_value'][1].path,
      lang2: this._route.url['_value'][2].path,
      start: startPoint,
      numRows: this.itemsPerPage
    };
    // searchByLanguagesUserId
    if (this.userId) {
      let subs = this.SearchService.searchByLanguagesUserId(searchParams)
        .map((data) => { return JSON.parse(data['_body'])[0]; })
        .subscribe(
          (data) => {
            this.SearchService.results = data;
            this.SearchService.totalPages = Math.ceil(this.SearchService.count / this.SearchService.itemsPerPage);
            this.SearchService.pagesRange = this.pagesRange(1, this.SearchService.totalPages);
            this.recountVotes();
            subs.unsubscribe();
            this.isSearching = false;
          }
        );
    } else {
      // searchByLanguages without user id
      let subs = this.SearchService.searchByLanguages(searchParams)
        .map((data) => { return JSON.parse(data['_body'])[0]; })
        .subscribe(
          (data) => {
            this.SearchService.setResults(data);
            this.SearchService.results = data;
            this.SearchService.totalPages = Math.ceil(this.SearchService.count / this.SearchService.itemsPerPage);
            this.SearchService.pagesRange = this.pagesRange(1, this.SearchService.totalPages);
            this.recountVotes();
            subs.unsubscribe();
            this.isSearching = false;
          }
        );
    }
  }

  searchByTerm() {
    let searchParams = {
      termVal: this._route.url['_value'][1].path
    };
    let subs = this.SearchService.searchByTerm(searchParams)
      .map((data) => { return JSON.parse(data['_body'])[0]; })
      .subscribe(
        (data) => {
          this.SearchService.results = data;
          this.SearchService.count = this.SearchService.results.length;
          this.recountVotes();
          subs.unsubscribe();
          this.isSearching = false;
        }
      );
  }

  searchById() {
    let searchParams = {
      termId: this._route.url['_value'][1].path
    };
    let subs = this.SearchService.searchById(searchParams)
      .map((data) => { return JSON.parse(data['_body']); })
      .subscribe(
        (data) => {
          this.SearchService.results = [data];
          this.SearchService.count = this.SearchService.results.length;
          this.recountVotes();
          subs.unsubscribe();
          this.isSearching = false;
        }
      );
  }

  search() {
    // Get ID
    this.userId = localStorage.getItem('usedId');
    // Get Top Terms - Homepage
    if (this._route.url['_value'][0] === undefined) {
      this.SearchService.searchType = 'top-terms';
      this.isSearching = true;
      this.homePageTopTerms();
    } else {
      // Get search results by id
      if (this._route.url['_value'][0].path === 'term-id') {
        this.SearchService.searchType = 'term-id';
        this.isSearching = true;
        this.searchById();
      } else
      // Get search results by language
      if (this._route.url['_value'][0].path === 'search-languages') {
        this.SearchService.searchType = 'search-languages';
        this.isSearching = true;
        this.searchByLanguages();
      } else
      // Get search results by term
      if (this._route.url['_value'][0].path === 'search-term') {
        this.SearchService.searchType = 'search-term';
        this.isSearching = true;
        this.searchByTerm();
      } else {
        this._router.navigate(['']);
      }
    }
  }

}
