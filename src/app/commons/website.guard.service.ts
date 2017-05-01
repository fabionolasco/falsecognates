import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LanguagesService } from './languages.service';

@Injectable()
export class WebsiteAuthGuardService implements CanActivate {

  constructor(private _languagesService: LanguagesService) {}

  canActivate(): Promise<boolean> {
    return new Promise<boolean>(
      (resolve) => {
        let tmp = localStorage.getItem('website_text');
        if (tmp) {
          this._languagesService.websiteText = JSON.parse(tmp);
          resolve(true);
        } else {
          this._languagesService.translateSite(false)
            .map((resp) => { return resp.json(); })
            .subscribe(
              (resp) => {
                this._languagesService.websiteText = resp;
                resolve(true);
                localStorage.setItem('website_text', JSON.stringify(resp));
              },
              (err) => {
                this._languagesService.translateSite('en')
                  .map((resp) => { return resp.json(); })
                  .subscribe(
                    (resp) => {
                      this._languagesService.websiteText = resp;
                      resolve(true);
                      localStorage.setItem('website_text', JSON.stringify(resp));
                    }
                  );
              }
            );
        }
      }
    );
  }

}
