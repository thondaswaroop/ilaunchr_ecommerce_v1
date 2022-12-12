import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavigationService } from 'src/app/providers/navigation.service';
import { StorageService } from 'src/app/providers/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  sessionID = environment.appLoginSessionID;

  constructor(private platform: Platform, private navigate: NavigationService, public storageData: StorageService) { }

  async ngOnInit() {
    this.forceLogin();
  }

  async forceLogin() {
    if (environment.forceLogin) {
      this.storageData.destroySessions();
      this.storageData.set(this.sessionID, '1');
      setTimeout(() => {
        this.navigate.navigateasMain('home');
      }, 4000); // holding an interval for 5 seconds
    }
    else {
      await this.platform.ready();
      setTimeout(() => {
        this.checkonboard(); //Triggering Checking login Status function
      }, 4000); // holding an interval for 5 seconds
    }
  }

  async checkonboard() {
    this.storageData.get(this.sessionID).then((sessionStatus: any) => {
      console.log('sessionStatus',sessionStatus);
      if (sessionStatus != '' && sessionStatus != undefined && sessionStatus != 'undefined') {
        this.navigate.navigateasMain('home');
      }
      else {
        this.storageData.get('onboardstatus').then((trgered:any) => {
          if (trgered != 'yes') {
            this.navigate.navigateasMain('welcome');
          }
          else {
            this.navigate.navigateasMain('login');
          }
        });
      }
    });
  }
}
