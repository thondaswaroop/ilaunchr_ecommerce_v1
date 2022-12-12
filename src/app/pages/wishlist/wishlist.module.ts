import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WishlistPageRoutingModule } from './wishlist-routing.module';

import { WishlistPage } from './wishlist.page';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'src/app/modules/custom-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WishlistPageRoutingModule,
    CustomComponentsModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  declarations: [WishlistPage]
})
export class WishlistPageModule {}
