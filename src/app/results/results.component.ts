import { Component, OnInit, Input } from '@angular/core';
import { TermsService } from '../commons/terms.service';
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
export class ResultsComponent implements OnInit {

  @Input() source: string;

  public votes;
  public count;
  public userId;
  public totalRecords;
  public currentPage;
  public totalPages;
  public itemsPerPage;
  public routeSubs;
  public hasVoted;
  public isVoting: Subscription;

  constructor(
    public TermsService: TermsService,
    private _userService: UserService,
    private _messagesService: MessagesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _searchService: SearchService,
    private _votesService: VotesService
  ) {
    // Listen for votes
    this.hasVoted = this._votesService.voting;
    this.isVoting = this.hasVoted
      .subscribe(
        () => { this.recountVotes(); }
      );
    // Prepare for Search
    this.itemsPerPage = this._searchService.itemsPerPage;
    this.routeSubs = this._router.events.subscribe((route) => {
        if (route instanceof NavigationEnd) {
          this.search();
        }
    });

  }

  ngOnInit() {
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
      this.TermsService.results.forEach((term) => {
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
    this._searchService.countTermsByLanguage(searchParams)
      .subscribe(
        (data) => {
          this._searchService.count = JSON.parse(data['_body'])[0][0]['totalTerms'];
        }
      );
  }

  recountVotes() {
    // Get Votes
    if (this.userId) {
      let termsIds = [];
      this.TermsService.results.forEach((term) => {
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
    let subsTerms = this.TermsService.getTopTerms()
      .subscribe(
        (resp) => {
          this.TermsService.results = JSON.parse(resp['_body'])[0];
          this.recountVotes();
          subsTerms.unsubscribe();
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
    let startPoint = (currentPage * this._searchService.itemsPerPage) - this._searchService.itemsPerPage;
    this.TermsService.results = this._searchService.results;
    this.countTermsByLanguage();
    let searchParams = {
      lang1: this._route.url['_value'][1].path,
      lang2: this._route.url['_value'][2].path,
      start: startPoint,
      numRows: this.itemsPerPage
    };
    // searchByLanguagesUserId
    if (this.userId) {
      let subs = this._searchService.searchByLanguagesUserId(searchParams)
        .subscribe(
          (data) => {
            this._searchService.results = JSON.parse(data['_body'])[0];
            this.TermsService.results = this._searchService.results;
            this._searchService.totalPages = Math.ceil(this._searchService.count / this._searchService.itemsPerPage);
            this._searchService.pagesRange = this.pagesRange(1, this._searchService.totalPages);
            this.recountVotes();
            subs.unsubscribe();
          }
        );
    } else {
      // searchByLanguages without user id
      let subs = this._searchService.searchByLanguages(searchParams)
        .subscribe(
          (data) => {
            this._searchService.results = JSON.parse(data['_body'])[0];
            this.TermsService.results = this._searchService.results;
            this._searchService.totalPages = Math.ceil(this._searchService.count / this._searchService.itemsPerPage);
            this._searchService.pagesRange = this.pagesRange(1, this._searchService.totalPages);
            this.recountVotes();
            subs.unsubscribe();
          }
        );
    }
  }

  searchByTerm() {
    let searchParams = {
      termVal: this._route.url['_value'][1].path
    };
    let subs = this._searchService.searchByTerm(searchParams)
      .subscribe(
        (data) => {
          this._searchService.results = JSON.parse(data['_body'])[0];
          this.TermsService.results = this._searchService.results;
          this._searchService.count = this.TermsService.results.length;
          this.recountVotes();
          subs.unsubscribe();
        }
      );
  }

  search() {
    // Get ID
    this.userId = localStorage.getItem('usedId');
    // Get Top Terms - Homepage
    if (this.source === 'top') {
      this.homePageTopTerms();
    } else {
      // Get search results by language
      if (this._route.url['_value'].length >= 3) {
        this.searchByLanguages();
      } else
      // Get search results by term
      // this._router[1].split('/')[1] === 'search-term' &&
      if (this._route.url['_value'].length === 2) {
        this.searchByTerm();
      } else {
        this._router.navigate(['']);
      }
    }
  }

}
