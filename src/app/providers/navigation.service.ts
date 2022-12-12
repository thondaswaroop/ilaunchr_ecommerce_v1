import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(public navigate: NavController, public router: Router) { }

  navigateasMain(page: any) {
    this.navigate.navigateRoot(page);
  }

  navigateForward(page: any) {
    this.navigate.navigateForward(page);
  }

  navigateWithData(page: any, data: any) {
    const navigationExtras: NavigationExtras = {
      state: data
    };
    this.navigate.navigateForward(page, navigationExtras);
  }

  navigateToPreviousPage() {
    this.navigate.back();
  }

  getNavigationParams() {
    return this.router.getCurrentNavigation()?.extras?.state;
  }

}
