import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderService } from './header.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('banner') banner: ElementRef;

  public classMap = '';

  constructor(
    public _HeaderService: HeaderService,
    private _Router: Router
  ) {

    // On route change
    let that = this;
    let r = Math.random() * (5 - 1) + 1;
    this._Router.events.subscribe((a) => {
      if (a instanceof NavigationEnd) {
        switch (a.url) {
          case '/':
            that.classMap = 'homepage';
            break;
          case '/about':
            that.classMap = 'about';
            break;
          case '/contact':
            that.classMap = 'contact';
            break;
          case '/login':
            that.classMap = 'search';
            break;
          case '/search':
            that.classMap = 'search';
            break;
          case '/suggest':
            that.classMap = 'suggest';
            break;
          default:
            that.classMap = 'others';
            break;
        }
      }
    });

  }

  ngOnInit() {
  }

}
