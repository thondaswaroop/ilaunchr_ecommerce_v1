import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { WelcomePage } from './welcome.page';
import { CustomComponentsModule } from 'src/app/modules/custom-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomComponentsModule,
    WelcomePageRoutingModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule {}
