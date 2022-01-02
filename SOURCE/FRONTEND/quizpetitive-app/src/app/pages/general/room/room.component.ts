import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket/socket.service';
import { DataService } from 'src/app/shared/services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})

export class RoomComponent implements OnInit {
  isHost: boolean;
  name: boolean = false;
  joinAudio: any = new Audio();
  leaveAudio: any = new Audio();
  startRoundAudio: any = new Audio();
  rightAudio: any = new Audio();
  wrongAudio: any = new Audio();
  tickSound: any = new Audio();
  pickSound: any = new Audio();
  endSound: any = new Audio();
  constructor(private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private socketService: SocketService, public dataService: DataService) {}

  ngOnDestroy(): void{
    if(this.router.url !== "/game" && !this.dataService.gameNotFound) location.reload();
  }

  getInviteLink(){
    return (environment.production ? "https://quizpetitive.com/room/" : "http://localhost:4200/room/") + this.dataService.roomId;
  }

  ngOnInit(): void { 
    this.joinAudio.src = "assets/sounds/join.wav";
    this.leaveAudio.src = "assets/sounds/leave.wav";
    this.startRoundAudio.src = "assets/sounds/start_round.wav";
    this.wrongAudio.src = "assets/sounds/wrong_answer.wav";
    this.rightAudio.src = "assets/sounds/right_answer.wav";
    this.tickSound.src = "assets/sounds/tick.wav";
    this.pickSound.src = "assets/sounds/pick.wav";
    this.endSound.src = "assets/sounds/endscreen.wav";
    this.joinAudio.load();
    this.leaveAudio.load();
    this.startRoundAudio.load();
    this.wrongAudio.load();
    this.rightAudio.load();
    this.tickSound.load();
    this.pickSound.load();
    this.endSound.load();
    this.joinAudio.volume = 0.5;
    this.leaveAudio.volume = 0.5;
    this.startRoundAudio.volume = 0.5;
    this.wrongAudio.volume = 0.5;
    this.rightAudio.volume = 0.5;
    this.pickSound.volume = 0.5;
    const id = this.route.snapshot.paramMap.get('id');
    this.dataService.roomId = id;
    this.isHost = !id;
    console.log('HOST', this.isHost);
   // TODO not change max players
    
  }

  startGame(){
    if(this.isHost){
      console.log("start time",this.dataService.timer);
      this.socketService.startGame(this.dataService.maxPlayers, this.dataService.rounds, this.dataService.maxTime, this.dataService.roomId);
    }
  }

  dataChange(){
    if(this.dataService.timer > 60){
      this.dataService.timer = 60;
      (<HTMLInputElement>document.getElementById('timeInput')).value = "60";
    } else if(this.dataService.timer < 15){
      this.dataService.timer = 15;
    }
    this.socketService.gameDataChangeEvent(this.dataService.rounds, this.dataService.maxTime, this.dataService.maxPlayers, this.dataService.roomId);
  }
  dataRoundsChange(rounds){
    this.dataService.rounds = rounds;
    this.socketService.gameDataChangeEvent(this.dataService.rounds, this.dataService.maxTime, this.dataService.maxPlayers, this.dataService.roomId);
  }

  RoundSelectChange(event: any) {
    this.dataService.rounds = event.target.value;
    console.log("rounds changed to: " + this.dataService.rounds);
  }

  setName(){
    if(this.dataService.ownPlayerName){
      if(this.isHost){
        console.log("You are host");

        this.socketService.connect(()=>{
          console.log("host connected");
          this.socketService.createRoom(this.dataService.ownPlayerName);
          this.socketService.onCreatedRoomEvent((res)=>{
            let data = res.data;
            console.log("room created");
            this.joinAudio.play();
            this.name = true;
            this.dataService.roomId = data.id;
            this._snackBar.open("Der Raum wurde erstellt", "OK", {
              duration: 2000,
            });
            this.dataService.ownPlayerIndex = data.playerIndex;
            this.dataService.playerData.push({index: data.playerIndex, name: data.name, points: 0});
          });
          this.socketService.onPlayerLeftEvent((res)=>{
            let data = res.data;
            if(data.isChoosing){
              this.dataService.currentChooser = data.playerIndex;
              if(this.dataService.ownPlayerIndex == data.playerIndex){
                this.dataService.isChoosing = true;
                this.socketService.gameRandomCategoriesGetEvent(this.dataService.ownPlayerIndex, this.dataService.roomId);
              }
              this.dataService.currentRound = data.rounds;
            }
            console.log("player left", data, this.dataService.playerData);
            for(let i = 0; i<this.dataService.playerData.length; i++){
              if(this.dataService.playerData[i].index == data.playerData.index){
                this.dataService.playerData.splice(i, 1);
                console.log(this.dataService.playerData);
                break;
              }
            }
          });
          this.socketService.onGameNotFound(()=>{
            console.log("game not found");
            this.router.navigateByUrl('/');
            this.dataService.clear();
            this.dataService.gameNotFound = true;
            this._snackBar.open("Spiel wurde nicht gefunden!", "OK", {
              duration: 5000,
            });
          });
          this.socketService.onPlayerJoinedEvent((res)=>{
            let data = res.data;
            console.log("other player joined");
            this._snackBar.open(data.name + " ist beigetreten", "OK", {
              duration: 3000,
            });
            this.joinAudio.play();
            this.dataService.playerData.push({index: data.playerIndex, name: data.name, points: 0});
          });
          this.socketService.onGameDataChangedEvent((res)=>{
            let data = res.data;
            console.log("you changed data");
            this.dataService.rounds = data.rounds;
            this.dataService.maxPlayers = data.maxPlayers;
            this.dataService.timer = data.time;
          });
          this.socketService.onGameStartedEvent((res)=>{
            let data = res.data;
            console.log("you started game");
            this.startRoundAudio.play();
            this.dataService.playerData = data.playerData;
            this.dataService.room = false;
            this.dataService.currentChooser = data.playerIndex;
            if(this.dataService.ownPlayerIndex == data.playerIndex){
              this.dataService.isChoosing = true;
              this.socketService.gameRandomCategoriesGetEvent(this.dataService.ownPlayerIndex, this.dataService.roomId);

            }
            this.router.navigateByUrl('/game');
          });
          this.socketService.onGameRandomCategoriesGotEvent((data)=>{
            this.dataService.categories = data.randomCategories;
          });
          this.socketService.onGameQuestionChoosenEvent((res)=>{
            let data = res.data;
            this.dataService.playing = true;
            this.dataService.isChoosing = false;
            this.dataService.choosenDifficulty = undefined;
            this.dataService.choosenCategory = {name: undefined, hard: undefined, medium: undefined, easy: undefined};
            this.dataService.currentQuestion = data.question;
          });
          this.socketService.onPlayerGuessedEvent((res)=>{
            this.dataService.guessedPlayers.push(res.data.playerIndex);
            if(res.data.playerIndex == this.dataService.ownPlayerIndex){
              this.dataService.hasAnswered = true;
              this.pickSound.play();
            }
          });
          this.socketService.onUpdateTimeEvent((res)=>{
            let data = res.data;
            this.dataService.timer = data.time;
            if(data.time <= 5) this.tickSound.play();
          });
          this.socketService.onTimeEndedEvent((res)=>{
            let data = res.data;
            console.log("timer ended", res);
            this.dataService.guessedPlayers = [];
            this.dataService.currentAnswer = data.rightIndex;
            this.dataService.playerData = data.room.playerData;
            this.dataService.playerData.sort((a, b) => b.points - a.points);
            this.dataService.waiting = true;
            setTimeout( ()=>{
              this.dataService.playing = false;
              this.dataService.currentAnswer = -1;
              this.dataService.currentGuess = -1;
              this.dataService.hasAnswered = false;
              this.dataService.waiting = false;
              this.dataService.timer = this.dataService.maxTime;
            }, 4000);
            if(!this.dataService.hasAnswered) {
              this._snackBar.open("Die Zeit ist abgelaufen!", "OK", {
                duration: 4000,
              });
              this.wrongAudio.play();
            } else if(this.dataService.currentGuess != this.dataService.currentAnswer){
              this._snackBar.open("Die Antwort war leider falsch", "OK", {
                duration: 4000,
              });
              this.wrongAudio.play();
            } else {
              this._snackBar.open("Richtige Antwort", "OK", {
                duration: 4000,
              });
              this.rightAudio.play();
            }
            if(data.ending){
              this.dataService.winners = this.dataService.playerData;
              setTimeout( ()=>{
                this.dataService.ended = true;
                this.dataService.clear();
                this.endSound.play();
              }, 4000);
              setTimeout( ()=>{
                this.socketService.disconnect();
              }, 6000);
            } else {
              this.dataService.currentRound = data.room.currentRound;
              this.dataService.currentChooser = data.room.playerIndex;
              if(this.dataService.ownPlayerIndex == data.room.playerIndex){
                this.dataService.isChoosing = true;
                this.socketService.gameRandomCategoriesGetEvent(this.dataService.ownPlayerIndex, this.dataService.roomId);
              }
            }
          });
        });
      } else {
        console.log("You are not host");
        this.socketService.connect(()=>{
          console.log("player connected");
          console.log(this.dataService.roomId);
          console.log(this.dataService.ownPlayerName);
          this.socketService.playerJoinEvent(this.dataService.roomId, this.dataService.ownPlayerName);
          this.socketService.onGameNotFound(()=>{
            console.log("game not found");
            this.router.navigateByUrl('/');
            this.dataService.gameNotFound = true;
            this.dataService.clear();
            this._snackBar.open("Spiel wurde nicht gefunden!", "OK", {
              duration: 3000,
            });
            setTimeout( ()=>{
              location.reload();
            }, 3000);
          });
          this.socketService.onPlayerLeftEvent((res)=>{
            let data = res.data;
            if(data.isChoosing){
              this.dataService.currentChooser = data.playerIndex;
              if(this.dataService.ownPlayerIndex == data.playerIndex){
                this.dataService.isChoosing = true;
                this.socketService.gameRandomCategoriesGetEvent(this.dataService.ownPlayerIndex, this.dataService.roomId);
              }
              this.dataService.currentRound = data.rounds;
            }
            console.log("player left", data, this.dataService.playerData);
            for(let i = 0; i<this.dataService.playerData.length; i++){
              if(this.dataService.playerData[i].index == data.playerData.index){
                this.dataService.playerData.splice(i, 1);
                console.log(this.dataService.playerData);
                break;
              }
            }
          });
          this.socketService.onJoinedRoom((res)=>{
            let data = res.data;
            console.log("you joined the room");
            this._snackBar.open("Raum beigetreten!", "OK", {
              duration: 5000,
            });
            this.joinAudio.play();
            this.name = true;
            this.dataService.maxPlayers = data.room.maxPlayers;
            this.dataService.timer = data.room.time;
            this.dataService.rounds = data.room.rounds;
            this.dataService.playerData = data.room.playerData;
            this.dataService.ownPlayerIndex = data.playerIndex;
            this.dataService.roomId = data.room._id;
          });
          this.socketService.onPlayerJoinedEvent((res)=>{
            let data = res.data;
            console.log("other user joined room");
            this._snackBar.open(data.name + " ist beigetreten!", "OK", {
              duration: 5000,
            });
            this.joinAudio.play();
            this.dataService.playerData.push({index: data.playerIndex, name: data.name, points: 0});
          });
          this.socketService.onGameDataChangedEvent((res)=>{
            let data = res.data;
            console.log("host changed data");
            this.dataService.rounds = data.rounds;
            this.dataService.maxPlayers = data.maxPlayers;
            this.dataService.maxTime = data.time;
          });
          this.socketService.onGameStartedEvent((res)=>{
            let data = res.data;
            this.startRoundAudio.play();
            this.dataService.playerData = data.playerData;
            console.log("host started game");
            this.dataService.room = false;
            this.dataService.currentChooser = data.playerIndex;
            if(this.dataService.ownPlayerIndex == data.playerIndex){
              this.dataService.isChoosing = true;
              console.log("choosing true 2");
              console.log(this.dataService.ownPlayerIndex);
              console.log(data.playerIndex);
              this.socketService.gameRandomCategoriesGetEvent(this.dataService.ownPlayerIndex, this.dataService.roomId);
            }
            this.router.navigateByUrl('/game');
          });
          this.socketService.onGameRandomCategoriesGotEvent((data)=>{
            this.dataService.categories = data.randomCategories;
          });
          this.socketService.onGameQuestionChoosenEvent((res)=>{
            let data = res.data;
            this.dataService.playing = true;
            this.dataService.isChoosing = false;
            this.dataService.choosenDifficulty = undefined;
            this.dataService.choosenCategory = {name: undefined, hard: undefined, medium: undefined, easy: undefined};
            this.dataService.currentQuestion = data.question;
          });
          this.socketService.onPlayerGuessedEvent((res)=>{
            this.dataService.guessedPlayers.push(res.data.playerIndex);
            if(res.data.playerIndex == this.dataService.ownPlayerIndex){
              this.dataService.hasAnswered = true;
              this.pickSound.play();
            }
          });
          this.socketService.onUpdateTimeEvent((res)=>{
            let data = res.data;
            this.dataService.timer = data.time;
            if(data.time <= 5) this.tickSound.play();
          });
          this.socketService.onTimeEndedEvent((res)=>{
            let data = res.data;
            console.log("timer ended");
            this.dataService.guessedPlayers = [];
            this.dataService.currentAnswer = data.rightIndex;
            this.dataService.playerData = data.room.playerData;
            console.log("playerDataSet",this.dataService.playerData);
            this.dataService.playerData.sort((a, b) => b.points - a.points);
            this.dataService.waiting = true;
            setTimeout( ()=>{
              this.dataService.playing = false;
              this.dataService.currentAnswer = -1;
              this.dataService.currentGuess = -1;
              this.dataService.hasAnswered = false;
              this.dataService.waiting = false;
              this.dataService.timer = this.dataService.maxTime;
            }, 4000);
            if(!this.dataService.hasAnswered) {
              this._snackBar.open("Die Zeit ist abgelaufen!", "OK", {
                duration: 4000,
              });
              this.wrongAudio.play();
            } else if(this.dataService.currentGuess != this.dataService.currentAnswer){
              this._snackBar.open("Die Antwort war leider falsch", "OK", {
                duration: 4000,
              });
              this.wrongAudio.play();
            } else {
              this._snackBar.open("Richtige Antwort", "OK", {
                duration: 4000,
              });
              this.rightAudio.play();
            }
            if(data.ending){
              this.dataService.winners = this.dataService.playerData;
              setTimeout( ()=>{
                this.dataService.ended = true;
                this.dataService.clear();
                this.endSound.play();
              }, 4000);
              setTimeout( ()=>{
                this.socketService.disconnect();
              }, 6000);
            } else {
              this.dataService.currentRound = data.room.currentRound;
              this.dataService.currentChooser = data.room.playerIndex;
              if(this.dataService.ownPlayerIndex == data.room.playerIndex){
                this.dataService.isChoosing = true;
                this.socketService.gameRandomCategoriesGetEvent(this.dataService.ownPlayerIndex, this.dataService.roomId);
              }
            }
          });
        });
      }
    }
  }

  copyText() {
    var copyText = (document.getElementById('inviteLink') as HTMLInputElement);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    (document.getElementById('copied') as HTMLInputElement).style.display = "block";
  }
}