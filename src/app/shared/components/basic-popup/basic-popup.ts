import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-basic-popup',
  standalone: false,
  templateUrl: './basic-popup.html',
  styleUrl: './basic-popup.scss'
})
export class BasicPopup {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string, body: string}
  ) {}
}
