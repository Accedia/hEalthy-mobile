import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';

import { HomePage } from './home.page';
import { ImgurUploadModule } from '../services/imgur-upload/imgur-upload.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    ImgurUploadModule
  ],
  declarations: [HomePage],
  providers: [
    Camera
  ]
})
export class HomePageModule {}
