import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../commons/languages.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public LanguagesService: LanguagesService) { }

  ngOnInit() {
  }

}
