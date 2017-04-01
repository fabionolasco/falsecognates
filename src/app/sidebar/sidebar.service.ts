import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  public sidebarOpen: boolean = false;
  public smallScreen: boolean;
  public windowListen: boolean = false;

  constructor() {
    this.smallScreen = window.innerWidth < 768;
    // console.log(this.smallScreen,  window.innerWidth);
    if (!this.windowListen) {
      this.windowListen = true;
      window.addEventListener('resize', ()  => this.smallScreen = window.innerWidth < 768);
    }
  }

  getStatus(): boolean {
    return this.sidebarOpen;
  }

  changeStatus(b?: boolean): boolean {
    if (b !== null && typeof b !== 'undefined') {
      this.sidebarOpen = b;
      return b;
    }
    this.sidebarOpen = !this.sidebarOpen;
    return this.sidebarOpen;
  }

}
