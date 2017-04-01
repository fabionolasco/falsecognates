import 'hammerjs';

/* Modules */
import { AppRouterModule } from './app.routes';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SharedModule } from './commons/shared.module';

/* Services */
import { MessagesService } from './commons/messages.service';
import { SidebarService } from './sidebar/sidebar.service';
import { UserService } from './commons/user.service';

/* Components */
import { AppComponent } from './app.component';
import { Components } from './app.routes';

@NgModule({
  imports: [AppRouterModule, MaterialModule.forRoot(), SharedModule],
  declarations: [AppComponent, Components],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private _messagesService: MessagesService,
    private _router: Router,
    private _sidebarService: SidebarService,
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

  // Method called to check if session is still valid
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

