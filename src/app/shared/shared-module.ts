import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicPopup } from './components/basic-popup/basic-popup';

@NgModule({
  declarations: [
    Header,
    BasicPopup
  ],
  imports: [
    CommonModule, 
    RouterModule,
    MatDialogModule
  ],
  exports: [
    Header
  ]
})
export class SharedModule {}