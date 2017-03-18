import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  public baseUrl = 'http://www.falsecognates.com:3000/api/';

  public queryHeaders;

  constructor(private http: Http) {
    this.makeHeader();
  }

  public makeHeader() {
    let token = localStorage.getItem('session_token');
    this.queryHeaders =  new Headers();
    this.queryHeaders.append('Content-Type', 'application/json');
    if (token) {
      this.queryHeaders.append('Authorization', token);
    }
  }

  OnInit() { }

}
