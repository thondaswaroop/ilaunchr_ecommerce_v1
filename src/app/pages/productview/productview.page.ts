import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { StorageService } from 'src/app/providers/storage.service';
import { ToastService } from 'src/app/providers/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.page.html',
  styleUrls: ['./productview.page.scss'],
})
export class ProductviewPage implements OnInit {

  navLoadedParams: any;
  productdata: any = [];
  businessinfo: any = [];
  preferColorTheme: string = '';

  constructor(private router: Router, public navigate: NavigationService, public api: ApiService, public load: LoaderService, public storage: StorageService, public toast: ToastService) {
  }

  ngOnInit() {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.navLoadedParams = this.router.getCurrentNavigation()?.extras.state;
      this.load.loadStart();
      this.api.get('productinfo&id=' + this.navLoadedParams.product).subscribe((data: any) => {
        this.productdata = data.product;
        this.load.loadStop();
      });
    }

    this.api.get('businessinfo').subscribe((businessinfo: any) => {
      this.businessinfo = businessinfo.business;
    });
    this.storage.get('preferColor').then((color: any) => {
      this.preferColorTheme = color;
    });
  }

  purchase(product: any, type: any) {
    if (type == 'addtoCart') {
      this.load.loadStart();
      this.storage.get(environment.appLoginSessionID).then((userid: any) => {
        this.storage.get(environment.appOrderRandom).then((ordernumber: any) => {
          this.api.get('cart&productid=' + product.id + '&userid=' + userid + '&rnm=' + ordernumber).subscribe((data: any) => {
            this.load.loadStop();
            if (data.status == 'true') {
              this.toast.successtoast(data.message);
              this.storage.set(environment.appOrderRandom, data.rnm);
            }
            else {
              this.toast.errortoast(data.message);
            }
          })
        });
      });
    }
    else {
      this.load.loadStart();
      this.storage.get(environment.appLoginSessionID).then((userid: any) => {
        this.storage.get(environment.appOrderRandom).then((ordernumber: any) => {
          this.api.get('cart&productid=' + product.id + '&userid=' + userid + '&rnm=' + ordernumber).subscribe((data: any) => {
            this.load.loadStop();
            if (data.status == 'true') {
              this.toast.successtoast(data.message);
              this.storage.set(environment.appOrderRandom, data.rnm);
              this.navigate.navigateForward('cart');
            }
            else {
              this.toast.errortoast(data.message);
            }
          })
        });
      });
    }
  }

  redirectto(url: any) {
    window.open(url);
  }

}
