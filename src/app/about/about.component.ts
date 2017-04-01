import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../commons/header.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(public _HeaderService: HeaderService) {
    this._HeaderService.headerSize = 'small';
  }

  ngOnInit() {
  }

}
