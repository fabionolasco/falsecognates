import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class SuggestAuthGuardService implements CanActivate {

  constructor(private _userService: UserService, private _router: Router) {}

  canActivate() {
    if (this._userService.token && this._userService.token.length > 0) {
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }

}