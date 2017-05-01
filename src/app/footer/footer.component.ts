import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../commons/languages.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public LanguagesService: LanguagesService) { }

  ngOnInit() {
  }

}
