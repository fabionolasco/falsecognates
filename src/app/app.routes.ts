/* Modules */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { AboutComponent } from './about/about.component';
import { AgreementComponent } from './agreement/agreement.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HeaderComponent } from './header/header.component';
import { HistoryComponent } from './history/history.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InitPageComponent } from './init-page/init-page.component';
import { LoginComponent } from './login/login.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResultsComponent } from './results/results.component';
import { SearchComponent } from './search/search.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SuggestComponent } from './suggest/suggest.component';
import { TermsComponent } from './terms/terms.component';

/* Services */
import { WebsiteAuthGuardService } from './commons/website.guard.service';
import { LoginAuthGuardService } from './commons/login.guard.service';
import { SuggestAuthGuardService } from './commons/suggest.guard.service';

/* Routes */
const appRoutes: Routes = [
  { path: '', component: InitPageComponent,
    canActivate: [WebsiteAuthGuardService ],
    children: [
      { path: '', component: HomepageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'new-password', component: NewPasswordComponent },
      { path: 'agreement', component: AgreementComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuardService ] },
      { path: 'term-id/:termVal', component: SearchComponent },
      { path: 'search-term/:termVal', component: SearchComponent },
      { path: 'search-languages/:lang1/:lang2', component: SearchComponent },
      { path: 'search-languages/:lang1/:lang2/:page', component: SearchComponent },
      { path: 'search', component: SearchComponent },
      { path: 'search-term', redirectTo: '' },
      { path: 'search-languages', redirectTo: '' },
      { path: 'suggest', component: SuggestComponent, canActivate: [ SuggestAuthGuardService ] },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [LoginAuthGuardService, SuggestAuthGuardService, WebsiteAuthGuardService],
  exports: [RouterModule]
})
export class AppRouterModule { }

export const Components = [
  AboutComponent,
  AgreementComponent,
  AppComponent,
  ContactComponent,
  FooterComponent,
  ForgotComponent,
  HeaderComponent,
  HistoryComponent,
  HomepageComponent,
  LoginComponent,
  NewPasswordComponent,
  NotFoundComponent,
  ResultsComponent,
  SearchComponent,
  SearchBarComponent,
  SidebarComponent,
  SuggestComponent,
  TermsComponent
];
