import { Component, OnInit } from '@angular/core';
import { CharacterBuilder } from '../../services/character-builder';
import { Character } from '../../../interfaces/character';
import { DataStorage } from '../../../shared/services/data-storage';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class Loader implements OnInit{

  constructor(
    private characterBuilder: CharacterBuilder,
    private dataStorage: DataStorage
  ) {}

  characters: Character[] | null = [];
  character: Character | undefined = undefined;
  characterId: string = "";

  ngOnInit(): void {
    // this.characterBuilder.reset();
    this.dataStorage.chars?.subscribe(chars => this.characters = chars);
  }

  selectCharacter() {  
    this.character = this.characters?.find(c => c.id === this.characterId);
    if (this.character) {
      this.characterBuilder.updateCharacter(this.character);
      this.characterBuilder.getStats(this.character.stats);
    }
  }
}
