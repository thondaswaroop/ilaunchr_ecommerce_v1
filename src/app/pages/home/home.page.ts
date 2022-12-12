import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IonSlides } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api/api.service';
import { StorageService } from 'src/app/providers/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('mySlider') slides: any = IonSlides;
  slider: any;
  slideActiveIndex: number = 0;
  categoryid: string = '';
  currentCategory: string = '';
  currentCategoryTitle: string = '';
  cartAction: any = '';
  preferColorTheme: string = '';

  banners: any = [];
  categories: any = [];

  currency = environment.currency;

  constructor(public api: ApiService, public storage: StorageService) {
    this.offlineMode();
  }

  offlineMode() {
    if (environment.offline) {
      for (let i = 0; i <= 7; i++) {
        this.categories.push({ 'id': i, 'title': 'Categories ' + i });
      }
    }
    else {
      this.loadallData();
    }
  }

  loadallData() {
    this.loadBanners();
    this.loadCategories();
  }

  /* Load Banners from Backend*/
  loadBanners() {
    this.api.get('banners').subscribe((data: any) => {
      this.banners = data.banners; //banners data which includes image and all other content
    });
  }

  /* Load categories from Backend*/
  loadCategories() {
    this.api.get('categories').subscribe((data: any) => {
      this.categories = data.categories; //loadCategories data which includes image and all other content
      this.currentCategory=this.categories[0].id;
      this.currentCategoryTitle=this.categories[0].title;
      this.loadProductsBasedOnCategory(this.currentCategory, 0, '');
    });
  }


  slideOpts = {
    speed: 400
  };
  slideDidChange(event: any, slideView: any) {
    this.slider = slideView;
    this.slider.getActiveIndex((index: any) => {
      this.slideActiveIndex = index;
      this.loadProductsBasedOnCategory(this.currentCategory, index, '');
    })

  }

  segmentChanged(event: any) {
  }

  loadProductsBasedOnCategory(category: string, index: any, title: string) {
    this.currentCategory = category;
    this.currentCategoryTitle = title;
  }

  ngOnInit() {
    this.storage.get('preferColor').then((color: any) => {
      this.preferColorTheme = color;
    });
  }

  ionViewDidEnter() {
    this.cartAction = Math.random();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadallData();
      event.target.complete();
    }, 2000);
  };

  onCartUpdate(event: any) {
    if (event.cart == 'added') {
      this.cartAction = Math.random();
    }
  }

}
