import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductviewPageRoutingModule } from './productview-routing.module';

import { ProductviewPage } from './productview.page';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'src/app/modules/custom-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductviewPageRoutingModule,
    CustomComponentsModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  declarations: [ProductviewPage]
})
export class ProductviewPageModule {}
