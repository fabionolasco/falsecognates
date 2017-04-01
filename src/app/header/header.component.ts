import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderService } from '../commons/header.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('banner') banner: ElementRef;

  public classMap = '';

  constructor(
    public _HeaderService: HeaderService,
    private _Router: Router
  ) {

    // On route change, change hero background and size
    this._Router.events.subscribe((a) => {
      if (a instanceof NavigationEnd) {
        switch (a.url) {
          case '/':
            this.classMap = 'homepage';
            break;
          case '/about':
            this.classMap = 'about';
            break;
          case '/contact':
            this.classMap = 'contact';
            break;
          case '/login':
            this.classMap = 'search';
            break;
          case '/search':
            this.classMap = 'search';
            break;
          case '/suggest':
            this.classMap = 'suggest';
            break;
          default:
            this.classMap = 'others';
            break;
        }
      }
    });

  }

  ngOnInit() {
  }

}
