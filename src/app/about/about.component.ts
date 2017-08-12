import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../commons/header.service';
import { LanguagesService } from '../commons/languages.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(public _HeaderService: HeaderService, public LanguagesService: LanguagesService) {
    this._HeaderService.headerSize = 'small';
  }

  ngOnInit() {

  }

}
