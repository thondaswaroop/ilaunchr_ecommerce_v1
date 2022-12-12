import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { StorageService } from 'src/app/providers/storage.service';
import { ToastService } from 'src/app/providers/toast.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnChanges {

  @Input() category: string = '';
  @Input() cartActionFun: string = '';
  @Input() categorytitle: string = '';
  @Input() productsType: string = '';
  @Output() onCartUpdate = new EventEmitter<any>();
  currency = environment.currency;
  products: any = [];
  productsdatashow: boolean = false;
  titleText: string = '';
  dummyloop: any = [];
  businessinfo: any = [];
  preferColorTheme: string = '';

  constructor(public api: ApiService, public storage: StorageService, public toast: ToastService, public load: LoaderService, public navigate: NavigationService) {
    this.dummyloop.length = 5;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productsLoad();
    this.productsdatashow = false;
    // this.titleText = 'View All ' + this.categorytitle + ' Products';
    this.titleText = 'View More';
    this.api.get('businessinfo').subscribe((businessinfo: any) => {
      this.businessinfo = businessinfo.business;
    });
    this.storage.get('preferColor').then((color: any) => {
      this.preferColorTheme = color;
    });
  }

  purchase(product: any, type: any, index: any) {
    if (type == 'addtoCart') {
      this.load.loadStart();
      this.storage.get(environment.appLoginSessionID).then((userid: any) => {
        this.storage.get(environment.appOrderRandom).then((ordernumber: any) => {
          this.api.get('cart&productid=' + product.id + '&userid=' + userid + '&rnm=' + ordernumber).subscribe((data: any) => {
            if (data.status == 'true') {
              this.toast.successtoast(data.message);
              this.products[index].cart = 'added';
              this.storage.set(environment.appOrderRandom, data.rnm);
              this.load.loadStop();
              this.onCartUpdate.emit({
                'cart': 'added'
              });
            }
            else {
              this.toast.errortoast(data.message);
              this.load.loadStop();
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

  wishlistModify(pid: any, index: any) {
    this.load.loadStart();
    this.storage.get(environment.appLoginSessionID).then((userid: any) => {
      this.api.get('addtowishlist&userid=' + userid + '&product=' + pid).subscribe((data: any) => {
        if (data.status == 'success') {
          if (data.mode == 'added') {
            this.products[index].wishlist = 'added';
          }
          else if (data.mode == 'removed') {
            this.products[index].wishlist = '';
          }
          this.toast.successtoast(data.message);
          this.load.loadStop();
        }
        else {
          this.toast.errortoast(data.message);
          this.load.loadStop();
        }
      });
    });
  }

  loadAllProducts() {
    this.navigate.navigateWithData('products', { category: this.category, title: this.categorytitle });
  }

  productsLoad() {
    if (this.productsType == 'featured') {
      if (this.category == '0') {
        this.storage.get(environment.appLoginSessionID).then((userid: any) => {
          this.storage.get(environment.appOrderRandom).then((ordernumber: any) => {
            this.api.get('featuredallproducts&userid=' + userid + '&rnm=' + ordernumber).subscribe((data: any) => {
              this.products = data.fproducts
              this.productsdatashow = true;
            });
          });
        });
      }
      else {
        this.storage.get(environment.appLoginSessionID).then((userid: any) => {
          this.storage.get(environment.appOrderRandom).then((ordernumber: any) => {
            this.api.get('featuredallproducts&category=' + this.category + '&userid=' + userid + '&rnm=' + ordernumber).subscribe((data: any) => {
              this.products = data.fproducts
              this.productsdatashow = true;
            });
          });
        });
      }
    } else {
      this.storage.get(environment.appLoginSessionID).then((userid: any) => {
        this.storage.get(environment.appOrderRandom).then((ordernumber: any) => {
          this.api.get('products&category=' + this.category + '&userid=' + userid + '&rnm=' + ordernumber).subscribe((data: any) => {
            this.products = data.fproducts
            this.productsdatashow = true;
          });
        });
      });
    }
  }

  ngOnInit() {
    this.productsdatashow = false;
  }

  productView(product: any) {
    this.navigate.navigateWithData('productview', {
      'product': product
    })
  }

}
