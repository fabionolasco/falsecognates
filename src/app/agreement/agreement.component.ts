import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../commons/header.service';
import { LanguagesService } from '../commons/languages.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {

  constructor(public _HeaderService: HeaderService, public LanguagesService: LanguagesService) {
    this._HeaderService.headerSize = 'small';
  }

  ngOnInit() {
  }

}
