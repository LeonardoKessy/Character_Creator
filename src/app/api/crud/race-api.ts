import { Injectable } from '@angular/core';
import { Crud } from '../crud';
import { Race } from '../../interfaces/race';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RaceAPI extends Crud<Race> {

  constructor(http: HttpClient) {
    super(http, 'race')
  }
}
