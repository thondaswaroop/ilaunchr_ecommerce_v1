import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { StorageService } from 'src/app/providers/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  navLoadedParams: any;
  order: any = [];
  business_type: string = '';

  constructor(private router: Router, public load: LoaderService, public api: ApiService, public storage: StorageService, public navigate: NavigationService) { }

  ngOnInit() {
    this.loadOrder();
    this.business_type=environment.business_type;
  }

  loadOrder() {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.navLoadedParams = this.router.getCurrentNavigation()?.extras.state;
      this.load.loadStart();
      this.api.get('orderview&id=' + this.navLoadedParams.id).subscribe((data: any) => {
        this.order = data.order;
        this.load.loadStop();
      });
    }
  }

}
