import { Component, OnInit } from '@angular/core';
import { CharacterBuilder } from '../../services/character-builder';


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

  constructor(private characterBuilder: CharacterBuilder) {}

  values: number[] = [];
  handleFinish(values: any[][]) {
    let ready: boolean = values[0].find((x: string) => x != 'READY');
    if (ready != undefined) return;
    this.values = values[1];
  }

  disabled: boolean = false;

  save() {
    this.disabled = this.characterBuilder.upload();
  } 
}
