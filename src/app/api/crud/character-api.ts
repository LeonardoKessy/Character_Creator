import { Injectable } from '@angular/core';
import { Crud } from '../crud';
import { HttpClient } from '@angular/common/http';
import { Character } from '../../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterAPI extends Crud<Character> {

  constructor(http: HttpClient) {
    super(http, 'character')
   }
}
