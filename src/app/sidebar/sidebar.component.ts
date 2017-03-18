import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { UserService } from '../commons/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
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
        (resp) => { console.log(resp); subs.unsubscribe(); },
        (resp) => { console.log(resp); subs.unsubscribe(); }
      );
  }

  ngOnInit() {
  }

}
