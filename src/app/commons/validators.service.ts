import { Injectable } from '@angular/core';

@Injectable()
export class ValidatiorsService {

  constructor() { }

  public emailValidator(data) {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(data);
  }

  public passwordValidator(data) {
    return data.length > 4;
  }

}
