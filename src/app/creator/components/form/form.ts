import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html',
  styleUrl: './form.scss'
})

export class Form {
  values: number[] = [];
  handleFinish(values: any[][]) {
    let ready: boolean = values[0].find((x: string) => x != 'READY');
    if (ready != undefined) return;
    this.values = values[1];
  }

  
}
