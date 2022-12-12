import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'src/app/modules/custom-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    CustomComponentsModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
