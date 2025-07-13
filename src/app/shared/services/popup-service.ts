import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpPopup } from '../../creator/components/form/help-popup/help-popup';
import { BasicPopup } from '../components/basic-popup/basic-popup';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private dialog: MatDialog
  ) {}
  
  openHelp() {
    this.dialog.open(HelpPopup,
      {
        maxWidth: 'none',
        maxHeight: 'none',
      }
    );
  }

  openBasic(title: string, body: string = "") {
    this.dialog.open(BasicPopup,
      {
        maxHeight: 'none',
        maxWidth: 'none',
        data: {
        title: title,
        body: body
      }}
    )
  }
}
