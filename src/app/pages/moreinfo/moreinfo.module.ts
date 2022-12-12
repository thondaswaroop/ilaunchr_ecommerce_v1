import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreinfoPageRoutingModule } from './moreinfo-routing.module';

import { MoreinfoPage } from './moreinfo.page';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'src/app/modules/custom-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreinfoPageRoutingModule,
    CustomComponentsModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  declarations: [MoreinfoPage]
})
export class MoreinfoPageModule {}
