import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../global/components/input/input.component';
import { CustomButtonComponent } from '../global/components/custom-button/custom-button.component';
import { HeaderComponent } from '../global/components/header/header.component';
import { FooterComponent } from '../global/components/footer/footer.component';
import { ProductComponent } from '../global/display/product/product.component';
import { ShorttextPipe } from '../pipes/shorttext.pipe';



@NgModule({
  declarations: [
    InputComponent,
    CustomButtonComponent,
    HeaderComponent,
    ShorttextPipe,
    FooterComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  exports: [
    InputComponent,
    CustomButtonComponent,
    ShorttextPipe,
    HeaderComponent,
    FooterComponent,
    ProductComponent
  ]
})
export class CustomComponentsModule { }
