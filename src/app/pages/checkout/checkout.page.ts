import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { StorageService } from 'src/app/providers/storage.service';
import { ToastService } from 'src/app/providers/toast.service';
import { ValidationService } from 'src/app/providers/validation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  cartitems: any = [];
  cartData: any = [];
  user: any = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'phone': '',
    'deliveryaddress': '',
    'pickupdate': '',
    'pickuptime': '',
    'business_type': '',
    'comments': ''
  };
  actionButtonList: any = [];
  businessInfo: any = [];

  constructor(public load: LoaderService, public api: ApiService, public storage: StorageService, public toast: ToastService, private actionSheetCtrl: ActionSheetController, public validation: ValidationService, public navigate: NavigationService) { }

  ngOnInit() {
    this.loadCartItems();
    this.api.get('businessinfo').subscribe((data: any) => {
      this.businessInfo = data.business;
      this.user.business_type=this.businessInfo.business_type;
    });
  }

  async proceedCheckout() {
    this.load.loadStart();
    if (this.validation.checkEmptyValue(this.user.firstname)) {
      this.load.loadStop();
      this.toast.errortoast('Enter Firstname');
    }
    else if (this.validation.checkEmptyValue(this.user.lastname)) {
      this.load.loadStop();
      this.toast.errortoast('Enter Last name');
    }
    else if (this.validation.checkEmptyValue(this.user.email)) {
      this.load.loadStop();
      this.toast.errortoast('Enter Email Address');
    }
    else if (this.validation.checkValidEmail(this.user.email)) {
      this.load.loadStop();
      this.toast.errortoast('Invalid_Email');
    }
    else if (this.validation.checkEmptyValue(this.user.phone)) {
      this.load.loadStop();
      this.toast.errortoast('Enter Phone Number');
    }
    else {
      if (this.businessInfo.business_type == '0') {
        if (this.validation.checkEmptyValue(this.user.deliveryaddress)) {
          this.load.loadStop();
          this.toast.errortoast('Enter Delivery Address');
        }
        else {
          this.load.loadStop();
          this.showPaymentOptions();
        }
      }
      else if (this.businessInfo.business_type == '1') {
        if (this.validation.checkEmptyValue(this.user.pickupdate)) {
          this.load.loadStop();
          this.toast.errortoast('Enter Delivery Address');
        }
        else if (this.validation.checkEmptyValue(this.user.pickuptime)) {
          this.load.loadStop();
          this.toast.errortoast('Enter Delivery Address');
        }
        else {
          this.load.loadStop();
          this.showPaymentOptions();
        }
      }
    }
  }

  async showPaymentOptions() {
    this.actionButtonList = [];

    /* Paytm Button Start */
    // this.actionButtonList.push({
    //   text: 'Paytm',
    //   handler: () => { this.paymentType('paytm'); }
    // });
    /* Paytm Button Ends */

    /* Cash on Delivery Button Start */
    this.actionButtonList.push({
      text: 'Cash',
      handler: () => { this.paymentType('cod'); }
    });
    /* Cash on Delivery Button Ends */

    /* Cancel Button Start */
    this.actionButtonList.push({
      text: 'Cancel',
      role: 'cancel',
    });
    /* Cancel Button Ends */

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Payment Method',
      subHeader: 'Select your Payment Type',
      cssClass: 'my-custom-class',
      buttons: this.createButtons()
    });
    await actionSheet.present();
  }

  createButtons() {
    let buttons = [];
    for (let index in this.actionButtonList) {
      buttons.push(this.actionButtonList[index]);
    }
    return buttons;
  }

  paymentType(type: any) {
    if (type == 'cod') {
      this.successOrder(type);
    }
  }

  loadCartItems() {
    this.load.loadStart();
    this.storage.get(environment.appLoginSessionID).then((userid: any) => {
      this.storage.get(environment.appOrderRandom).then((ordernumber: any) => {
        this.api.get('getcart&rnm=' + ordernumber + '&userid=' + userid).subscribe((data: any) => {
          this.cartitems = data.cartitems;
          this.cartData = data;
          this.load.loadStop();
        });
      });
    });
  }

  successOrder(paymethod: any) {
    this.load.loadStart();
    this.storage.get(environment.appLoginSessionID).then((userid: any) => {
      this.storage.get(environment.appOrderRandom).then((ordernumber: any) => {
        let alldata = { 'firstname': this.user.firstname, 'lastname': this.user.lastname, 'email': this.user.email, 'phone': this.user.phone, 'deliveryaddress': this.user.deliveryaddress, 'pickupdate': this.user.pickupdate, 'pickuptime': this.user.pickuptime, 'comments': this.user.comments };
        this.api.post('checkoutnew', { 'rnm': ordernumber, 'pay_method': paymethod, 'userid': userid, 'alldata': alldata }).subscribe((data: any) => {
          this.load.loadStop();
          if (data.status == 'true') {
            this.storage.set(environment.appOrderRandom, data.rnm);
            this.toast.successtoast(data.message);
            this.navigate.navigateasMain('home');
          }
          else {
            this.toast.successtoast('Something Went Wrong');
          }
        });
      });
    });
  }

}
