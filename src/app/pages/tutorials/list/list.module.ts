import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { TutorialDetailsComponent } from 'src/app/components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from 'src/app/components/add-tutorial/add-tutorial.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule
  ],
  declarations: [ListPage, TutorialDetailsComponent,AddTutorialComponent]
})
export class ListPageModule { }
