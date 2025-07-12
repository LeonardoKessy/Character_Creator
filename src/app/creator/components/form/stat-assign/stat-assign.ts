import { Component, Input, OnInit } from '@angular/core';
import { STATS } from '../../../utils/validStats';
import { Stats } from '../../../../interfaces/stats';
import { CharacterBuilder } from '../../../services/character-builder';
import { basicStats } from '../../../utils/basicModels';

@Component({
  selector: 'app-stat-assign',
  standalone: false,
  templateUrl: './stat-assign.html',
  styleUrl: './stat-assign.scss'
})
export class StatAssign implements OnInit {
  STATS = STATS;
  @Input() rolledValues: number[] = [];
  values: number[] = [];
  valuesCopy: number[] = [];
  valuesShow: boolean[] = Array(6).fill(true);
  stats : Stats = {...basicStats};

  constructor(private characterBuilder: CharacterBuilder) {}

  ngOnInit(): void {
   this.values = [...this.rolledValues]; 
   this.valuesCopy = [...this.values];
  }


  handleSelect(e: Event) {
    const target = e.target as HTMLSelectElement;
    const stat = target.name as Exclude<keyof Stats, 'id' | 'race'>;
    const val = parseInt(target.value);
    const prev = this.stats[stat]; 
    const index = target.selectedIndex;

    if (prev !== 0) {
      this.values.unshift(prev)
      let flag = false;
      this.valuesCopy.forEach((element, i) => {
        if (element == prev && this.valuesShow[i] == false && !flag) {
          this.valuesShow[i] = true;
          flag = true;
        }
      });
    };

    this.stats[stat] = val;

    const i = this.values.indexOf(val);
    if (i !== -1) {
      this.values.splice(i, 1);
      this.valuesShow[index - 1] = false;
    }
    
    this.characterBuilder.updateStats(this.stats)
  }
}
