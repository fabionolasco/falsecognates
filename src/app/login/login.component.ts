import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../commons/user.service';
import { ValidatiorsService } from '../commons/validators.service';
import { MessagesService } from '../commons/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginEmail') loginEmail: ElementRef;
  @ViewChild('loginPassword') loginPassword: ElementRef;
  @ViewChild('registerEmail') registerEmail: ElementRef;
  @ViewChild('registerPassword') registerPassword: ElementRef;

  public agreed = true;
  public loginData;
  public registerData;

  constructor(
    private _userService: UserService,
    public MessagesService: MessagesService,
    private _router: Router,
    private _validatiors: ValidatiorsService
  ) {
    this.cleanModels();
  }

  cleanModels() {
    this.loginData = {
      email: '',
      security: '',
      remember_me: true,
      password: ''
    };
    this.registerData = {
      email: '',
      security: '',
      password: '',
      confirm: '',
      remember_me: true
    };
  }

  sendLogin() {
    if (this.loginData.security.length > 0) {
      return this.cancelProcess('');
    } else {

        this._userService.login(this.loginData)
          .subscribe((data) => {

              // Login Worked, store token
              this.cleanModels();
              localStorage.setItem('session_status', 'valid');
              this._userService.storeToken(data['_body']);
              this._userService.userSession = JSON.parse(data['_body']);

              let subs = this._userService.checkSessionStatus()
                .subscribe(
                  (user) => {
                    subs.unsubscribe();
                  }
                );

          }, (error) => {
              this.cleanModels();
              this.MessagesService.message = error.json().error.message;
              this.MessagesService.type = 'alert-danger';
              this.loginEmail.nativeElement.focus();
          });

        return true;

    }
  }

  sendRegistration() {
    if (this.registerData.security.length > 0) {
      return this.cancelProcess('');
    } else
    if (!this._validatiors.emailValidator(this.registerData.email)) {
      this.registerEmail.nativeElement.focus();
      return this.cancelProcess('Email Invalid!');
    } else
    if (!this._validatiors.passwordValidator(this.registerData.password)) {
      this.registerPassword.nativeElement.focus();
      return this.cancelProcess('Password needs to have at least four characters.');
    } else
    if (this.registerData.password !== this.registerData.confirm) {
      this.registerPassword.nativeElement.focus();
      return this.cancelProcess('Password and Confirm Password does not match.');
    } else {

        this.registerData.confirm = '';
        this._userService.register(this.registerData)
          .subscribe((response) => {
              this.loginData.email = this.registerData.email;
              this.loginData.password = this.registerData.password;
              this.MessagesService.message = 'Welcome! You were successfuly registered!';
              this.MessagesService.type = 'alert-success';
              this.MessagesService.hasMessage = '/login';
              this.sendLogin();
          }, (error) => {
              this.cleanModels();
              this.cancelProcess(error.json().error.message);
              this.registerEmail.nativeElement.focus();
          });

        return true;

    }
  }

  cancelProcess(msg: string) {
    if (msg) {
      this.MessagesService.message = msg;
      this.MessagesService.type = 'alert-success';
      this.MessagesService.hasMessage = this._router.url;
    } else {
      this._router.navigate(['']);
    }
    return false;
  }

  ngOnInit() {
  }

}
