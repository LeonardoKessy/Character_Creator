import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stat-generator',
  standalone: false,
  templateUrl: './stat-generator.html',
  styleUrl: './stat-generator.scss'
})
export class StatGenerator implements OnInit{
  constructor() {}
  D6 = './assets/icons/game-icons/D6.svg';
  rolls: number[][] = [[], [], [], [], [], []];
  totals: number[] = [];
  revealedRolls: string[][] = [[], [], [], [], [], []];
  revealedTotals: string[] =  [];

  @Output() finish = new EventEmitter<any[][]>();
  emitFinish() {
    this.finish.emit([this.revealedTotals, this.totals]);
  }

  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        this.rolls[i][j] = Math.floor(Math.random() * 6) + 1;
        this.revealedRolls[i][j] = 'HIDDEN';
      }
      this.revealedTotals[i] = 'HIDDEN';
      this.totals[i] = this.rolls[i].reduce((a, b) => a + b, 0);
    }
  }

  reveal(i:number, j:number) {
    this.revealedRolls[i][j] = "REVEALED";
    let hidden = this.revealedRolls[i].find(c => c == 'HIDDEN');
    if (hidden == undefined) this.revealedTotals[i] = 'REVEALED';
  }

  revealRow(i: number) {
    for (let j = 0; j < this.revealedRolls[i].length; j++) {
      this.revealedRolls[i][j] = 'REVEALED';
    }
    this.revealedTotals[i] = 'REVEALED';
  }

  remove(i:number, j:number) {
    let hidden = this.revealedRolls[i].find(c => c == 'HIDDEN');
    if (hidden != undefined) return;

    let removed = this.revealedRolls[i].indexOf('REMOVED');
    if (removed > -1) this.revealedRolls[i][removed] = 'REVEALED';
    this.revealedRolls[i][j] = 'REMOVED';

    this.revealedTotals[i] = 'READY';

    this.totals[i] = 0;
    for (let k = 0; k < 4; k++) {
      if (k == j) continue;
      this.totals[i] += this.rolls[i][k];
    }
  }
}
