import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../commons/header.service';
import { MessagesService } from '../commons/messages.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(public _HeaderService: HeaderService, public MessagesService: MessagesService) {
    this._HeaderService.headerSize = 'normal';
  }

  ngOnInit() {
  }

}
