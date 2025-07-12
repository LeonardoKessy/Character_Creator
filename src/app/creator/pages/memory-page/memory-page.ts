import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorage } from '../../../shared/services/data-storage';

@Component({
  selector: 'app-memory-page',
  standalone: false,
  templateUrl: './memory-page.html',
  styleUrl: './memory-page.scss',
})

export class MemoryPage implements OnInit{

  constructor (
    private dataStorage: DataStorage,
  ) {}

  ngOnInit(): void {
    this.dataStorage.load();
  }
}
