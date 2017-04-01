/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Ng2PaginationModule } from 'ng2-pagination';

/* Services */
import { ForgotService } from '../forgot/forgot.service';
import { HeaderService } from './header.service';
import { HttpService } from './http.service';
import { LanguagesService } from './languages.service';
import { MessagesService } from './messages.service';
import { NewPasswordService } from '../new-password/new-password.service';
import { SearchService } from './search.service';
import { SidebarService } from '../sidebar/sidebar.service';
import { SuggestService } from '../suggest/suggest.service';
import { TermsService } from './terms.service';
import { UserService } from './user.service';
import { ValidatiorsService } from './validators.service';
import { VotesService } from './vote.service';

/* Pipes */
import { CapitalizePipe } from './capitalize.pipe';

@NgModule({
  declarations: [
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2AutoCompleteModule,
    Ng2PaginationModule
  ],
  providers: [
    ForgotService,
    HeaderService,
    HttpService,
    LanguagesService,
    MessagesService,
    NewPasswordService,
    SearchService,
    SidebarService,
    SuggestService,
    TermsService,
    UserService,
    ValidatiorsService,
    VotesService
  ],
  exports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2AutoCompleteModule,
    Ng2PaginationModule,

    CapitalizePipe
  ]
})
export class SharedModule { }

