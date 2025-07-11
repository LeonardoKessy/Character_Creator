import { Injectable } from '@angular/core';
import { Class } from '../../interfaces/class';
import { Crud } from '../crud';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassAPI extends Crud<Class> {

  constructor(http: HttpClient) {
    super(http, 'class')
   }
}
