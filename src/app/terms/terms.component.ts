import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserService } from '../commons/user.service';
import { SearchService } from '../commons/search.service';
import { LanguagesService } from '../commons/languages.service';
import { MessagesService } from '../commons/messages.service';
import { VotesService } from '../commons/vote.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  private _userId;
  private _initialVoteCount: number|null = null;
  private _initialVoteValue: number|null = null;

  @Input('item') item;

  constructor(
    public LanguagesService: LanguagesService,
    private _searchService: SearchService,
    private _userService: UserService,
    private _messagesService: MessagesService,
    private _router: Router,
    private _votesService: VotesService
  ) {
    this._userId = localStorage.getItem('usedId');
  }

  ngOnInit() { }

  // Verify if user can vote
  canVote(): boolean {
    if (!this._userService.isLoggedIn()) {
      this._messagesService.message = 'Please Log In or Register to vote!';
      this._messagesService.type = 'alert-warning';
      this._messagesService.hasMessage = this._router.url;
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

  isValid(x) {
    return !isNaN(x) && x !== undefined && x !== null;
  }

  getInitialValue() {
    this._initialVoteCount = (this.isValid(this.item.vote_count)) ? this.item.vote_count : 0;
    this._initialVoteValue = (this.isValid(this.item.vote_value)) ? this.item.vote_value : 0;
  }

  // Send Vote Now
  voteNow(vote_value: number, fcognate_id: number): void {
    this.getInitialValue();
    if (this.canVote()) {
      let formValues = {
        term_id: fcognate_id,
        vote_value: vote_value
      };
      let subs = this._votesService.sendVote(formValues)
        .subscribe(
          (data) => {
            // console.log('this.item', this.item);
            // console.log('this._initialVoteCount', this._initialVoteCount);
            // console.log('this._initialVoteValue', this._initialVoteValue);
            // console.log('vote_value', vote_value);
            // if (isNaN(this.item.vote_count)) { this.item.vote_count = 0; }
            this.item.vote_count = (this._initialVoteCount - this._initialVoteValue) + vote_value;
            // console.log('this.item.vote_count', this.item.vote_count);
            // console.log('========');
            this._votesService.voted.next(new Date());
            subs.unsubscribe();
          },
          (err) => {
            subs.unsubscribe();
          }
        );
    }
  }

  encodeUrl(str) {
    return encodeURIComponent(str);
  }

}
