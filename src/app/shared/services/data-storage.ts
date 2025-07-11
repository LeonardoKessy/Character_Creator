import { Injectable } from '@angular/core';
import { ClassAPI } from '../../api/crud/class-api';
import { RaceAPI } from '../../api/crud/race-api';
import { StatsAPI } from '../../api/crud/stats-api';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Race } from '../../interfaces/race';
import { Class } from '../../interfaces/class';
import { Stats } from '../../interfaces/stats';

@Injectable({
  providedIn: 'root'
})
export class DataStorage {

  private races$ = new BehaviorSubject<Race[] | null>(null);
  private raceStats$ = new BehaviorSubject<Stats[] | null>(null);
  private classes$ = new BehaviorSubject<Class[] | null>(null);

  constructor(
    private classAPI: ClassAPI,
    private raceAPI: RaceAPI,
    private statsAPI: StatsAPI,
  ) {}

  load(): void {
    this.classAPI.getAll().subscribe(r => this.classes$.next(r));
    this.raceAPI.getAll().subscribe(r => this.races$.next(r));
    this.statsAPI.getRaceStat().subscribe(r => this.raceStats$.next(r));
  }

  get races(): Observable<Race[] | null> {
    return this.races$.asObservable();
  }

  get classes(): Observable<Class[] | null> {
    return this.classes$.asObservable();
  }

  race(id: string): Observable<Race | undefined> {
    return this.races$.pipe(
      map(r => (r?.find(s => s.id == id)))
    )
  }

  stats(id: string): Observable<Stats | undefined> {
    return this.raceStats$.pipe(
      map(s => (s?.find(t => t.id == id)))
    )
  }

  class(id: string): Observable<Class | undefined> {
    return this.classes$.pipe(
      map(s => (s?.find(t => t.id == id)))
    )
  }
}
