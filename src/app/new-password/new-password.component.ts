import { Component, OnInit } from '@angular/core';
import { NewPasswordService } from './new-password.service';
import { MessagesService } from '../commons/messages.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  public newPassData = {
    security: '',
    password: '',
    confirmPassword: ''
  };

  constructor(public MessagesService: MessagesService, private _newPasswordService: NewPasswordService) { }

  sendNewPass() {
    if (this.newPassData.password !== this.newPassData.confirmPassword) {
      this.MessagesService.message = 'Passwords do not match!';
      this.MessagesService.type = 'alert-danger';
    }
    this._newPasswordService.newPass(this.newPassData)
      .subscribe(
        () => {

        }
      );
    this.MessagesService.message = 'New password registered successfully!';
    this.MessagesService.type = 'alert-success';
  }

  ngOnInit() {
  }

}
