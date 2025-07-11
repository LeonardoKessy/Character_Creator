import { Component, OnInit } from '@angular/core';
import { DataStorage } from '../../../shared/services/data-storage';

@Component({
  selector: 'app-creator-page',
  standalone: false,
  templateUrl: './creator-page.html',
  styleUrl: './creator-page.scss'
})
export class CreatorPage implements OnInit{

  constructor (private dataStorage: DataStorage) {}

  ngOnInit(): void {
    this.dataStorage.load();
  }
}
