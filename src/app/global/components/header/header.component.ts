import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from 'src/app/providers/navigation.service';
import { MenuController } from '@ionic/angular';
import { StorageService } from 'src/app/providers/storage.service';
import { ApiService } from 'src/app/providers/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() headerLabel: string = '';
  @Input() menuItem: string = '';
  @Input() showCart: string = '';
  @Input() cartActionFun: string = '';
  preferColorTheme: string = '';
  cartCount: number = 0;


  constructor(public translate: TranslateService, public navigate: NavigationService, public menu: MenuController, public api: ApiService, public storage: StorageService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCartCount();
  }

  ngOnInit() {
    this.getCartCount();
    this.storage.get('preferColor').then((color: any) => {
      this.preferColorTheme = color;
    });
  }

  getCartCount() {
    this.storage.get(environment.appLoginSessionID).then((userid: any) => {
      this.storage.get(environment.appOrderRandom).then((ordernumber: any) => {
        this.api.get('cartavailable&userid=' + userid + '&rnm=' + ordernumber).subscribe((data: any) => {
          this.cartCount = data.cartcount;
        })
      });
    });
  }

  close() {
    this.navigate.navigateToPreviousPage();
  }

  openMenu() {
    this.menu.enable(true, 'mainMenu2');
    this.menu.open('mainMenu2');
  }

  openCart() {
    this.navigate.navigateForward('cart');
  }

}
