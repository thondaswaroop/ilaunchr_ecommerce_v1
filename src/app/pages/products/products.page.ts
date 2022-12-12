import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { StorageService } from 'src/app/providers/storage.service';
import { ToastService } from 'src/app/providers/toast.service';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/providers/api/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  navLoadedParams: any;
  category: string = '';
  categorytitle: string = '';
  preferColorTheme: string = '';

  constructor(private router: Router, public load: LoaderService, public storage: StorageService, public toast: ToastService, public navigate: NavigationService,public api:ApiService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.navLoadedParams = this.router.getCurrentNavigation()?.extras.state;
      this.categorytitle = this.navLoadedParams.title;
      this.category = this.navLoadedParams.category;
    }
    this.storage.get('preferColor').then((color: any) => {
      this.preferColorTheme = color;
    });
  }

  onCartUpdate(event: any) { }

}
