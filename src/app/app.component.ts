import { Component } from '@angular/core';
import { SidebarService } from './sidebar/sidebar.service';
import { LanguagesService } from './commons/languages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public _SidebarService: SidebarService,
    public _LanguagesService: LanguagesService
  ) {
    this._LanguagesService.getLanguages();
  }
}
