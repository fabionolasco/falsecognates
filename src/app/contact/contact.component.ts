import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../commons/header.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  private me: string = 'contact';
  private addr: string = 'falsecognates' + '.c' + 'om';
  public errorMessage: string = '';
  public successMessage: string = '';
  public data = {
    name: '',
    email: '',
    _subject: '',
    message: '',
    _gotcha: ''
  };

  constructor(public _HeaderService: HeaderService, private _Http: Http) {
    this._HeaderService.headerSize = 'small';
  }

  validateMessage() {
    if (this.data.name.length <= 3 || this.data.name.length > 100) { return false; } else
    if (this.data.email.length <= 7 || this.data.email.length > 100) { return false; } else
    if (this.data._subject.length <= 3 || this.data._subject.length > 100) { return false; } else
    if (this.data.message.length <= 0 || this.data.message.length > 9999) { return false; }
    return true;
  }

  sendMessage(form: NgForm) {
    this.errorMessage = '';
    this.successMessage = '';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers});
    let body = JSON.stringify(this.data);
    if (!this.validateMessage()) {
      this.errorMessage = 'Invalid content in form.';
    } else {
      this.data = {
        name: '',
        email: '',
        _subject: '',
        message: '',
        _gotcha: ''
      };
      this.successMessage = 'Message submited successfully!';
      document.body.scrollTop = 0;
      if (this.data._gotcha.length > 0) {
        return true;
      } else {
        this._Http.post(
          'https://formsp' + 'ree.io/' + this.me + decodeURIComponent('%40') + this.addr,
          body,
          options
          )
          .toPromise()
          .then(function(response: Response){
            // console.log('Message: ', response);
            return response;
          });
      }
    }
  }

  ngOnInit() {
  }

}
