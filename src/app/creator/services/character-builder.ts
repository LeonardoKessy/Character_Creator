import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { Character } from '../../interfaces/character';
import { Stats } from '../../interfaces/stats';
import { basicCharacter, basicStats } from '../utils/basicModels';
import { DataStorage } from '../../shared/services/data-storage';
import { CharacterAPI } from '../../api/crud/character-api';
import { StatsAPI } from '../../api/crud/stats-api';
import { STATS } from '../utils/validStats';

@Injectable({
  providedIn: 'root'
})

export class CharacterBuilder {

  constructor (
    private dataStorage: DataStorage,
    private charAPI: CharacterAPI,
    private statsAPI: StatsAPI
  ) {}

  private _character = new BehaviorSubject<Character>({...basicCharacter});
  character$ = this._character.asObservable();

  private _stats = new BehaviorSubject<Stats>({...basicStats});
  stats$ = this._stats.asObservable();

  updateCharacter(partial: Partial<Character>): void {
    const actual = this._character.value;
    this._character.next({...actual, ...partial});
  }

  updateStats(partial: Partial<Stats>): void {
    const actual = this._stats.value;
    this._stats.next({...actual, ...partial});
  }

  reset() {
    this.updateCharacter({...basicCharacter});
    this.updateStats({...basicStats});
  }

  getStats(id: string) {
    return this.statsAPI.get(id).subscribe(
      s => { 
        if (s) this.updateStats(s) 
      }
    );
  }

  get raceStats(): Observable<Stats | undefined> {
    return this.character$.pipe(
      switchMap(char => this.dataStorage.race(char.race)),
      switchMap(race => race ? this.dataStorage.stats(race.stats) : of(undefined))
    )
  }

  upload(): boolean {
    let baseStats = {...this._stats.getValue()};
    for (let stat of STATS) {
      if (baseStats[stat] < 3)
        return false;
    }

    let char = this._character.getValue();
    if (char.name === "" || char.race === "" || char.characterClass === "" )
      return false;

    this.raceStats.pipe(
      switchMap(raceStats => {
        for (let stat of STATS) {
          if (raceStats != undefined)
            baseStats[stat] += raceStats[stat];
        }
        const {id, race, ...insertStats} = baseStats;
        return this.statsAPI.insert(insertStats)
      }),
      switchMap(uploadedStats => {
        if (uploadedStats) {
          const {id, ...insertCharacter} = {...char};
          insertCharacter.stats = uploadedStats.id;
          return this.charAPI.insert(insertCharacter)
        }
        return of(null);
      }),
    ).subscribe();
    return true;
  }
}
