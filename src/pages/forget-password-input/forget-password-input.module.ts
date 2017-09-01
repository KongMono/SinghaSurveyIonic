import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPasswordInput } from './forget-password-input';

@NgModule({
  declarations: [
    ForgetPasswordInput
  ],
  imports: [
    IonicPageModule.forChild(ForgetPasswordInput),
  ],
  exports: [
    ForgetPasswordInput
  ]
})
export class ForgetPasswordInputModule {}
