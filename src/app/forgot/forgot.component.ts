import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../commons/messages.service';
import { ForgotService } from './forgot.service';
import { LanguagesService } from '../commons/languages.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  public forgotData = {
    security: '',
    email: ''
  };

  constructor(public MessagesService: MessagesService, private _forgotService: ForgotService, public LanguagesService: LanguagesService) { }

  sendForgotMessage() {
    if (!this.forgotData.security) {
      let data = {email: this.forgotData.email};
      this._forgotService.sendForgotRequest(data)
        .subscribe(
          () => { this.forgotData.email = ''; },
          () => { this.forgotData.email = ''; }
        );
    }
    // Security Through Obscurity
    // Give Success even if fake security field is filled
    this.success();
  }

  success() {
    this.MessagesService.type = 'alert-success';
    this.MessagesService.message = 'Instructions on how to reset your password was sent to your email.';
  }

  ngOnInit() {
  }

}
