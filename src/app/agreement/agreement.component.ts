import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {

  constructor(public _HeaderService: HeaderService) {
    this._HeaderService.headerSize = 'small';
  }

  ngOnInit() {
  }

}
