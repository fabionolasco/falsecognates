import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../commons/messages.service';
import { ForgotService } from './forgot.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  public forgotData = {
    security: '',
    email: ''
  };

  constructor(public MessagesService: MessagesService, private _forgotService: ForgotService) { }

  sendForgotMessage() {
    this._forgotService.sendForgotRequest({})
      .subscribe(
        () => {
          this.forgotData.email = '';
        }
      );
    this.MessagesService.type = 'alert-success';
    this.MessagesService.message = 'Instructions on how to reset your password was sent to your email.';
  }

  ngOnInit() {
  }

}
