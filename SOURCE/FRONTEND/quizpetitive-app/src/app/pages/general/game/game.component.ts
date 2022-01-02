import { Component, OnInit, OnDestroy } from '@angular/core';
import { element } from 'protractor';
import { SocketService } from 'src/app/shared/services/socket/socket.service';
import { threadId } from 'worker_threads';
import { DataService } from 'src/app/shared/services/data/data.service';
import { ConstantPool } from '@angular/compiler';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})



export class GameComponent implements OnInit, OnDestroy{
  constructor(private _snackBar: MatSnackBar, private route: ActivatedRoute, private socketService: SocketService, public dataService: DataService,  private router: Router) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        //this.socketService.disconnect(this.dataService.roomId, this.dataService.ownPlayerIndex);
      }
    });
  }
  ngOnInit(): void {
    if(!this.dataService.roomId){
      this.router.navigateByUrl("/");
    }
  }

  ngOnDestroy(): void{
    location.reload();
  }

  chooseQuestion() {
    if (this.dataService.isChoosing) {
      this.socketService.gameQuestionChooseEvent(this.dataService.choosenCategory.name, this.dataService.choosenDifficulty, this.dataService.roomId);
    }
  }

  categoryClicked(cat) {
    //this.dataService.choosenCategory = { name: "Analyse", easy: 0, medium: 0, hard:0};
    for(let category of this.dataService.categories){
      if(category.name === cat){
        this.dataService.choosenCategory = category;
        if(category.easy > 0){
          this.dataService.choosenDifficulty = 1;      
        } else if(category.medium > 0){
          this.dataService.choosenDifficulty = 2; 
        } else if(category.hard > 0){
          this.dataService.choosenDifficulty = 3; 
        } else {
          this._snackBar.open("Ein Fehler ist aufgetreten", "OK", {
            duration: 4000,
          });
          this.router.navigateByUrl("/");
        }
        return;
      }
    }
  }

  starClicked(id: string) {
    if (this.dataService.choosenCategory) {
      if(this.dataService.choosenCategory.easy > 0 && parseInt(id) == 1
      || this.dataService.choosenCategory.medium > 0 && parseInt(id) == 2
      || this.dataService.choosenCategory.hard > 0 && parseInt(id) == 3){
          this.dataService.choosenDifficulty = parseInt(id);
          (document.getElementsByClassName('stars')[0] as HTMLElement).dataset.stars = id;
      }
    }
  }
}
