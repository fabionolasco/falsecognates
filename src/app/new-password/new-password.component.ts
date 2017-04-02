import { Component, OnInit } from '@angular/core';
import { NewPasswordService } from './new-password.service';
import { MessagesService } from '../commons/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  public newPassData;

  constructor(public MessagesService: MessagesService, private _newPasswordService: NewPasswordService, private _router: Router) {
    this.clearPassData();
    this.newPassData.accessToken = document.location.href.split('=')[1];
    let token = localStorage.setItem('session_token', this.newPassData.accessToken);
  }

  clearPassData() {
    this.newPassData = {
      security: '',
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
    this.MessagesService.hasMessage = '';
    this._router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
