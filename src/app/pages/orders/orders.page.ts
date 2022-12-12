import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { StorageService } from 'src/app/providers/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders: any = [];

  constructor(public load: LoaderService, public api: ApiService, public storage: StorageService,public navigate:NavigationService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.load.loadStart();
    this.storage.get(environment.appLoginSessionID).then((userid: any) => {
      this.api.get('myorders&user=' + userid).subscribe((data: any) => {
        this.orders = data.orders;
        this.load.loadStop();
      });
    });
  }

  orderView(id: any) {
    this.navigate.navigateWithData('order',{
      'id':id
    });
  }

}
