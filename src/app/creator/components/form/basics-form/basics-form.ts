import { Component, OnInit } from '@angular/core';
import { STATS } from '../../../utils/validStats';
import { CharacterBuilder } from '../../../services/character-builder';
import { Stats } from '../../../../interfaces/stats';
import { basicCharacter, basicStats } from '../../../utils/basicModels';
import { Character } from '../../../../interfaces/character';
import { Race } from '../../../../interfaces/race';
import { Class } from '../../../../interfaces/class';
import { DataStorage } from '../../../../shared/services/data-storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basics-form',
  standalone: false,
  templateUrl: './basics-form.html',
  styleUrl: './basics-form.scss'
})

export class BasicsForm implements OnInit{
  STATS = STATS;
  constructor (
    private characterBuilder : CharacterBuilder, 
    private dataStorage: DataStorage
  ) {}

  ngOnInit(): void {
    this.classes = this.dataStorage.classes;
    this.races = this.dataStorage.races;
    this.characterBuilder.raceStats.subscribe(s => {
      this.raceStats = s ? s : this.raceStats
    });
  }

  classes: Observable<Class[] | null> | null = null;
  races: Observable<Race[] | null> | null = null;;
  
  char: Character = {...basicCharacter}
  raceStats: Stats = {...basicStats};


  updateCharacter() {
    this.characterBuilder.updateCharacter(this.char)
  }

}
