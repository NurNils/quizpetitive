import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { DataService } from '../../services/data/data.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private socketService: SocketService, public dataService: DataService) { }

  ngOnInit(): void {
  }

  getTime() {
    let timer = this.dataService.timer < 10 ? "0" + this.dataService.timer : this.dataService.timer;
    return "00:" + timer;
  }

  getOwnPlace(){
    for(let i = 0; i < this.dataService.playerData.length; i++){
      if(this.dataService.playerData[i].index == this.dataService.ownPlayerIndex){
        return i+1;
      }
    }
  }
  getOwnPoints(){
    for(let player of this.dataService.playerData){
      if(player.index == this.dataService.ownPlayerIndex){
        return player.points;
      }
    }
  }
}
