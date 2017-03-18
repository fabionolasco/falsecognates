import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public _HeaderService: HeaderService) {
    this._HeaderService.headerSize = 'small';
  }

  ngOnInit() {
  }

}
