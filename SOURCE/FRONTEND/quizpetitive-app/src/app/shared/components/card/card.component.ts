import { Component, Input } from '@angular/core';
import { Card } from '../../../interfaces/card.interface';
import { DataService } from '../../services/data/data.service';
import { SocketService } from '../../services/socket/socket.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  /** Constructor */
  constructor(public dataService: DataService, private socketService: SocketService) { }
  click(answer){
    this.dataService.currentGuess = answer;
    this.dataService.hasAnswered = true;
    this.socketService.gameQuestionGuessEvent(this.dataService.ownPlayerIndex, answer, this.dataService.roomId);
  }
}
