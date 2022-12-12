import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { StorageService } from 'src/app/providers/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  wishlists: any = [];
  currency: any = '';
  preferColorTheme: string = '';

  constructor(public api: ApiService, public storage: StorageService, public load: LoaderService, public navigate: NavigationService) { }

  ngOnInit() {
    this.currency = environment.currency;
    this.loadWhishlists();
    this.storage.get('preferColor').then((color: any) => {
      this.preferColorTheme = color;
    });
  }

  loadWhishlists() {
    this.load.loadStart();
    this.storage.get(environment.appLoginSessionID).then((userid: any) => {
      this.api.get('mywishlists&user=' + userid).subscribe((data: any) => {
        this.wishlists = data.products;
        this.load.loadStop();
      });
    });
  }

  wishlistModify(pid: any, index: any) {
    this.load.loadStart();
    this.storage.get(environment.appLoginSessionID).then((userid: any) => {
      this.api.get('addtowishlist&userid=' + userid + '&product=' + pid).subscribe((data: any) => {
        this.load.loadStop();
        this.loadWhishlists();
      });
    });
  }

  productView(product: any) {
    this.navigate.navigateWithData('productview', {
      'product': product
    })
  }

}
