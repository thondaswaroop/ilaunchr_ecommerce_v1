import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  categories: any = [];

  constructor(public api: ApiService, public load: LoaderService, public navigate: NavigationService) { }

  ngOnInit() {
    this.loadCategories();
  }

  /* Load categories from Backend*/
  loadCategories() {
    this.load.loadStart();
    this.api.get('categories').subscribe((data: any) => {
      this.categories = data.categories; //loadCategories data which includes image and all other content
      this.load.loadStop();
    });
  }

  openCategory(cid: any, title: any) {
    this.navigate.navigateWithData('products', { category: cid, title: title });
  }

}
