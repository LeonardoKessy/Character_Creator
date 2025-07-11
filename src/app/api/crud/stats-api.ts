import { Injectable } from '@angular/core';
import { Crud } from '../crud';
import { Stats } from '../../interfaces/stats';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SUPABASE_URL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class StatsAPI extends Crud<Stats> {

  constructor(http: HttpClient) {
    super(http, 'stats');
  }

  getRaceStat(): Observable<Stats[]> {
    return this.http.get<Stats[]>(`${SUPABASE_URL}/${this.table}?race=eq.true`, {
      headers: this.headers
    });
  }
}
