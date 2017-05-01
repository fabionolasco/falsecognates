import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../commons/languages.service';
import { SidebarService } from './sidebar.service';
import { UserService } from '../commons/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public LanguagesService: LanguagesService,
    public SidebarService: SidebarService,
    public UserService: UserService
  ) { }

  controlBar() {
      this.SidebarService.changeStatus(false);
      document.body.scrollTop = 0;
  }

  logout() {
    let subs = this.UserService.logout()
      .subscribe(
        (resp) => { subs.unsubscribe(); }
      );
  }

  ngOnInit() {
  }

}
