import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../commons/header.service';
import { MessagesService } from '../commons/messages.service';
import { LanguagesService } from '../commons/languages.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    public LanguagesService: LanguagesService,
    public _HeaderService: HeaderService,
    public MessagesService: MessagesService
  ) {
    this._HeaderService.headerSize = 'normal';
  }

  ngOnInit() {
  }

}
