import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SubstancesPage } from './substances.page';
import { SubstanceDetailsComponent } from './substance-details/substance-details.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SubstancesPage
      }
    ])
  ],
  declarations: [
    SubstancesPage,
    SubstanceDetailsComponent
  ]
})
export class SubstancesPageModule {}
