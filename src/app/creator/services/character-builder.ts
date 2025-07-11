import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Character } from '../../interfaces/character';
import { Stats } from '../../interfaces/stats';
import { basicCharacter, basicStats } from '../utils/basicModels';
import { DataStorage } from '../../shared/services/data-storage';

@Injectable({
  providedIn: 'root'
})

export class CharacterBuilder {

  constructor (private dataStorage: DataStorage) {}

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

  get raceStats(): Observable<Stats | undefined> {
    return this.character$.pipe(
      switchMap(char => this.dataStorage.race(char.race)),
      switchMap(race => race ? this.dataStorage.stats(race.stats) : of(undefined))
    )
  }
}
