import { Component, OnInit } from '@angular/core';
import { NewPasswordService } from './new-password.service';
import { MessagesService } from '../commons/messages.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  public newPassData;

  constructor(public MessagesService: MessagesService, private _newPasswordService: NewPasswordService) {
    this.clearPassData();
    this.newPassData.accessToken = document.location.href.split('=')[1];
  }

  clearPassData() {
    this.newPassData = {
      security: '',
      accessToken: '',
      password: '',
      confirmPassword: ''
    };
  }

  sendNewPass() {
    if (this.newPassData.password !== this.newPassData.confirmPassword) {
      this.MessagesService.message = 'Passwords do not match!';
      this.MessagesService.type = 'alert-danger';
    } else {
      this._newPasswordService.newPass(this.newPassData)
        .subscribe(
          (data) => {
            this.clearPassData();
            console.log(data);
          }
        );
      // Security Through Obscurity
      // Show success message even if sent token was invalid
      this.success();
    }
  }

  success() {
    this.MessagesService.message = 'New password registered successfully!';
    this.MessagesService.type = 'alert-success';
  }

  ngOnInit() {
  }

}
