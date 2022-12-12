import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { ToastService } from '../toast.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(public storage: StorageService, public api: ApiService, public toast: ToastService) { }

  addtoCart(productid: any) {
    console.log('productid',productid);
    this.storage.get(environment.appLoginSessionID).then((userid: any) => {
      this.storage.get(environment.appOrderRandom).then((ordernumber: any) => {
        return this.api.get('cart&productid=' + productid + '&userid=' + userid + '&rnm=' + ordernumber).subscribe((data: any) => {
          if (data.status == 'true') {
            this.toast.successtoast(data.message);
            this.storage.set(environment.appOrderRandom,data.rnm);
          }
          else {
            this.toast.errortoast(data.message);
          }
        })
      });
    });

  }
}
