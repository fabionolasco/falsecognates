import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router, NavigationStart } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Ng2PaginationModule } from 'ng2-pagination';

import { SidebarService } from './sidebar/sidebar.service';
import { LanguagesService } from './commons/languages.service';
import { HttpService } from './commons/http.service';
import { UserService } from './commons/user.service';
import { SuggestAuthGuardService } from './commons/suggest.guard.service';
import { LoginAuthGuardService } from './commons/login.guard.service';
import { ValidatiorsService } from './commons/validators.service';
import { HeaderService } from './header/header.service';
import { SuggestService } from './suggest/suggest.service';
import { MessagesService } from './commons/messages.service';
import { TermsService } from './commons/terms.service';
import { VotesService } from './commons/vote.service';
import { SearchService } from './commons/search.service';
import { NewPasswordService } from './new-password/new-password.service';
import { ForgotService } from './forgot/forgot.service';

import { CapitalizePipe } from './commons/capitalize.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TermsComponent } from './terms/terms.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AgreementComponent } from './agreement/agreement.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SuggestComponent } from './suggest/suggest.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HistoryComponent } from './history/history.component';
import { ForgotComponent } from './forgot/forgot.component';
import { NewPasswordComponent } from './new-password/new-password.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'agreement', component: AgreementComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuardService ] },
  { path: 'search-term/:termVal', component: SearchComponent },
  { path: 'search-languages/:lang1/:lang2', component: SearchComponent },
  { path: 'search-languages/:lang1/:lang2/:page', component: SearchComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search-term', redirectTo: '' },
  { path: 'search-languages', redirectTo: '' },
  { path: 'suggest', component: SuggestComponent, canActivate: [ SuggestAuthGuardService ] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    TermsComponent,
    HomepageComponent,
    AgreementComponent,
    LoginComponent,
    NotFoundComponent,
    SearchComponent,
    SearchBarComponent,
    SuggestComponent,
    CapitalizePipe,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    HistoryComponent,
    ForgotComponent,
    NewPasswordComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2AutoCompleteModule,
    Ng2PaginationModule,
    MaterialModule.forRoot()
  ],
  providers: [
    SidebarService,
    LanguagesService,
    HttpService,
    UserService,
    SuggestAuthGuardService,
    LoginAuthGuardService,
    HeaderService,
    ValidatiorsService,
    SuggestService,
    MessagesService,
    TermsService,
    VotesService,
    SearchService,
    NewPasswordService,
    ForgotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private _sidebarService: SidebarService,
    private _router: Router,
    private _messagesService: MessagesService,
    private _userService: UserService
    ) {

      // On route change
      this._router.events.subscribe((route) => {

        // Check Session
        this._userService.isLoggedIn();

        // Check status for Side Bar
        this._sidebarService.changeStatus(false);

        // Navigate to top of window
        document.body.scrollTop = 0;

        // Control Route Before Login
        if (route instanceof NavigationStart) {
          this._userService.urlBeforeLogin[0] = this._userService.urlBeforeLogin[1];
          this._userService.urlBeforeLogin[1] = route.url;
          console.log(this._userService.urlBeforeLogin);
          if (this._messagesService.hasMessage !== this._router.url) {
            this._messagesService.message = '';
            this._messagesService.hasMessage = this._router.url;
          }
        }

      });

      // Check Session Status every 30 seconds
      this.checkSessionStatus();
      setInterval(() => {
        this.checkSessionStatus();
      }, 30000);

  }

  checkSessionStatus() {
    let status = localStorage.getItem('session_status');
    if (!status || status === 'expired') {
      return;
    }
    let subs = this._userService.checkSessionStatus()
      .subscribe(
        (data) => {
          this._userService.userSession = JSON.parse(data['_body']);
          subs.unsubscribe();
        },
        () => {
          this._userService.logout();
          this._router.navigate(['/login']);
          this._messagesService.message = 'Your session expired! Please log in again!';
          this._messagesService.hasMessage = '/login';
          localStorage.setItem('session_status', 'expired');
          subs.unsubscribe();
        }
      );
  }

}

