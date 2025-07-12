import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CharacterBuilder } from '../../services/character-builder';
import { STATS } from '../../utils/validStats';
import { Class } from '../../../interfaces/class';
import { Race } from '../../../interfaces/race';
import { Stats } from '../../../interfaces/stats';
import { Character } from '../../../interfaces/character';
import { basicCharacter, basicStats } from '../../utils/basicModels';
import { DataStorage } from '../../../shared/services/data-storage';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-previewer',
  standalone: false,
  templateUrl: './previewer.html',
  styleUrl: './previewer.scss'
})
export class Previewer implements OnInit{
  STATS = STATS;
  range = Array(20);
  constructor (
    private characterBuilder: CharacterBuilder,
    private dataStorage: DataStorage,
    private cd: ChangeDetectorRef
  ) {}

  character: Character = {...basicCharacter};
  raceStats: Stats = {...basicStats};
  stats: Stats = {...basicStats}
  class$: Observable<Class | undefined> = of(undefined);
  race$: Observable<Race | undefined> = of(undefined);
  
  @Input() building: boolean = true;

  ngOnInit(): void {
    this.characterBuilder.reset();
    this.characterBuilder.character$.subscribe(c => {
      this.character = c;
      this.class$ = this.dataStorage.class(c.characterClass);
      this.race$ = this.dataStorage.race(c.race);
    });

    if (this.building) {
      this.characterBuilder.raceStats.subscribe(
      r => this.raceStats = r ? r : this.raceStats
    )
    }

    this.characterBuilder.stats$.subscribe(
      s => {
        this.stats = {...s}
        this.cd.detectChanges();
      }
    )
  }
}
