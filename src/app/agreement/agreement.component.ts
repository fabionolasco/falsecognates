import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../commons/header.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {

  constructor(public _HeaderService: HeaderService) {
    this._HeaderService.headerSize = 'small';
  }

  ngOnInit() {
  }

}
