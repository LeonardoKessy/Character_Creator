import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SUPABASE_KEY, SUPABASE_URL } from './environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export abstract class Crud<T> {

  constructor(protected http: HttpClient, protected table: string) {}

  protected headers = new HttpHeaders({
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  });

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${SUPABASE_URL}/${this.table}`, {
      headers: this.headers
    });
  }

  get(id: string): Observable<T | null> {
    return this.http.get<T[]>(`${SUPABASE_URL}/${this.table}?id=eq.${id}`, {
      headers: this.headers
    })
      .pipe(map(r => (r.length > 0 ? r[0] : null)));
  }

  insert(body: Partial<T>): Observable<T> {
    return this.http.post<T>(`${SUPABASE_URL}/${this.table}`, body, {
      headers: this.headers
    });
  }

  delete(id: string) {
    return this.http.delete(`${SUPABASE_URL}/${this.table}?id=eq.${id}`, {
      headers: this.headers
    });
  }

  update(id: string, body: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${SUPABASE_URL}/${this.table}?id=eq.${id}`, body, {
      headers: this.headers
    });

  }
}
