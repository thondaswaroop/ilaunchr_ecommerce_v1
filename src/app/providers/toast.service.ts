import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasttitle: any;
  errortoastAction:any;
  
  constructor(public toastController: ToastController, private translateService: TranslateService) { }
  

  async errortoast(data:any, vars = {}) {
    this.errortoastAction = await this.toastController.create({
      message: await this.translateService.get(data, vars).toPromise(),
      color: 'danger',
      duration: 2000,
      cssClass: 'custom-toast',
      buttons: [
        {
        side: 'end',
        icon: 'close',
        handler: () => {
          this.errortoastAction.dismiss();
        }}]
    });
    this.errortoastAction.present();
  }

 async toastDismiss(){
  if(this.errortoastAction)
  this.errortoastAction.dismiss();
 }

  async errortoastWithoutTranslation(data:any, vars = {}) {
    const toast = await this.toastController.create({
      message: data,
      color: 'danger',
      duration: 2000,
      cssClass: 'custom-toast'
    });
    toast.present();
  }
  async warningtoast(data:any, vars = {}) {
    const toast = await this.toastController.create({
      message: await this.translateService.get(data, vars).toPromise(),
      color: 'warning',
      duration: 2000,
      cssClass: 'custom-toast'
    });
    toast.present();
  }

  async successtoast(data:any, vars = {}) {
    const toast = await this.toastController.create({
      message: data,
      color: 'success',
      duration: 2000,
      cssClass: 'success-toast-dark'
    });
    toast.present();
  }
  async mulitplesuccesstoast(data:any, vars = {}) {

    if (data.length > 0) {
      const toast = await this.toastController.create({
        message: data[0],
        color: 'success',
        duration: 2000,
        buttons: [
          {
            side: 'end',
            icon: 'close',
            handler: () => {
              toast.dismiss();
            }
          }
        ]

      });
      await toast.present();
      await toast.onDidDismiss().then((data1) => {
        console.log('data1', data.shift());
        this.mulitplesuccesstoast(data);
      });
    }
  }

  async multiplewarningtoast(data:any, vars = {}) {
    let msgCount:any;
    if (data.length > 0) {
      if (data.length == 1) { msgCount = ''; }
      else { msgCount = (data.length-1)+' more warning..'; }
      const toast = await this.toastController.create({
        message: data[0],
        header: msgCount,
        color: 'warning',
        duration: 2000,
        buttons: [
          {
            side: 'end',
            icon: 'close',
            handler: () => {
              toast.dismiss();
            }
          }
        ]

      });
      await toast.present();
      await toast.onDidDismiss().then((data1) => {
        console.log('data1', data.shift());
        this.multiplewarningtoast(data);
      });
    }
  }

}
