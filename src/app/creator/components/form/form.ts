import { Component, OnInit } from '@angular/core';
import { CharacterBuilder } from '../../services/character-builder';
import { PopupService } from '../../../shared/services/popup-service';


@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html',
  styleUrl: './form.scss'
})

export class Form implements OnInit{

  ngOnInit(): void {
    this.characterBuilder.reset()
  }

  constructor(
    private characterBuilder: CharacterBuilder,
    private popup: PopupService
   ) {}

  values: number[] = [];
  handleFinish(values: any[][]) {
    let ready: boolean = values[0].find((x: string) => x != 'READY');
    if (ready != undefined) return;
    this.values = values[1];
    this.values.sort();
  }

  disabled: boolean = false;

  save() {
    this.disabled = this.characterBuilder.upload();
    if (this.disabled)
      this.popup.openBasic("Character has been uploaded succesfully.")
  } 

  openHelp() {
   this.popup.openHelp()
  }
}
