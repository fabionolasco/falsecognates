import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { MessagesService } from '../commons/messages.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public _HeaderService: HeaderService, public MessagesService: MessagesService) {
    this._HeaderService.headerSize = 'normal';
  }

  ngOnInit() {
  }

}
