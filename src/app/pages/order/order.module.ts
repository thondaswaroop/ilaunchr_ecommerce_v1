import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'src/app/modules/custom-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    CustomComponentsModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  declarations: [OrderPage]
})
export class OrderPageModule {}
