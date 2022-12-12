import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertPresented: boolean;
  constructor(
    private alertController: AlertController,
    private translateService: TranslateService
  ) {
    this.alertPresented = false
  }

  /**
   * This is the global method to display the information/alerts
   * @param headerText - hearder text
   * @param cssIconClass - which defines the what kind of alert icon to be display
   * @param messageText - To pass the message/description of alert action
   * @param alertPresented - To restrict multiple alerts for multiple click
   */
  async popAlertMessage(headerText: string, cssIconClass: string, messageText: string = "", alertPresented: boolean = false) {
    let vm = this
    if (!vm.alertPresented) {
      vm.alertPresented = true
      const alert = await this.alertController.create({
        cssClass: cssIconClass,
        header: await this.translateService.get(headerText).toPromise(),
        message: messageText.trim().length > 0 ? await this.translateService.get(messageText).toPromise() : "",
        buttons: [
          {
            text: await this.translateService.get("Ok").toPromise(),
            id: 'confirm-button',
            handler: () => {
              vm.alertPresented = false
            }
          }
        ]
      });
      vm.alertPresented = alertPresented
      await alert.present();
      await alert.onDidDismiss().then(() => {
        vm.alertPresented = false;
      });
    }
  }
  //alert for connection
  async showAlert(header:any, icon:any, okHandler = () => { }, message = "", translationParams = {}) {
    let headerText = await this.translateService.get(header, translationParams).toPromise();
    const alert = await this.alertController.create({
      cssClass: icon,
      header: headerText,
      message: message,
      buttons: [
        {
          text: await this.translateService.get('Ok').toPromise(),
          id: 'confirm-button',
          handler: () => {
            okHandler();
          }
        }
      ]
    });
    await alert.present();
  }
  //alert for timeout
  async showBackdropLessAlert(header:any, icon:any, okHandler = () => { }, message = "", translationParams = {}) {
    const alert = await this.alertController.create({
      cssClass: icon,
      header: await this.translateService.get(header, translationParams).toPromise(),
      message: message,
      backdropDismiss: false,
      buttons: [
        {
          text: await this.translateService.get('Ok').toPromise(),
          id: 'confirm-button',
          handler: () => {
            okHandler();
          }
        }
      ]
    });
    await alert.present();
  }
  // show success message when succesfully sent
  async showConfirmationAlert(message:any, icon:any, yesHandle = () => { }, noHandle = () => { }, translationParams = {}) {
    const alert = await this.alertController.create({
      header: await this.translateService.get(message, translationParams).toPromise(),
      cssClass: icon,
      buttons: [{
        text: await this.translateService.get('No').toPromise(),
        role: 'cancel',
        cssClass: 'secondary',
        id: 'cancel-button',
        handler: () => {
          noHandle()
        }
      }, {
        text: await this.translateService.get('Yes').toPromise(),
        id: 'confirm-button',
        handler: () => {
          yesHandle()
        }
      }
      ]
    })

    alert.present();
  }
  async confirmDeleteRecord(yesHandle = () => { }, message:any) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: await this.translateService.get(message).toPromise(),
      subHeader: '',
      // message: await this.translateService.get(message).toPromise(),
      cssClass: 'custom-alert',
      buttons: [
        {
          text: await this.translateService.get('No').toPromise(),
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: await this.translateService.get('Yes').toPromise(),
          id: 'confirm-button',
          handler: () => {
            yesHandle();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



}
