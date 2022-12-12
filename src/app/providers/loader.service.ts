import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  isLoading: boolean = false;

  constructor(public loadingController: LoadingController) { }

  async loadStart() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: '<ion-img src="assets/images/loader.gif" class="loader"></ion-img>',
      cssClass: 'custom-loader',
      spinner: null
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async loadStop() {
    this.isLoading = false;
    return this.loadingController.dismiss().then(() => console.log());
  }

}
