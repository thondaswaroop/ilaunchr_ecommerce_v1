import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { StorageService } from 'src/app/providers/storage.service';
import { ToastService } from 'src/app/providers/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartitems: any = [];
  cartData: any = [];
  actionButtonList: any = [];
  businessType: string = '';

  constructor(public load: LoaderService, public api: ApiService, public storage: StorageService, public toast: ToastService, public navigate: NavigationService) { }

  ngOnInit() {
    this.businessType = environment.business_type;
    this.loadCartItems();
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

  cartUpdate(type: any, cartID: any, quanty: any) {
    if (type == 'positive') {
      this.load.loadStart();
      this.api.post('plusqty', { 'id': cartID, 'qty': quanty }).subscribe((data: any) => {
        this.load.loadStop();
        this.loadCartItems();
      });
    }
    else if (type == 'negative') {
      this.load.loadStart();
      this.api.post('minsqty', { 'id': cartID, 'qty': quanty }).subscribe((data: any) => {
        this.load.loadStop();
        this.loadCartItems();
      });
    }
  }


  async doCheckout() {
    this.navigate.navigateForward('checkout');
  }

}
