import { Component, Input } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {
  /** Character */
  @Input() character: Character;

  /** Constructor */
  constructor() { }

}
