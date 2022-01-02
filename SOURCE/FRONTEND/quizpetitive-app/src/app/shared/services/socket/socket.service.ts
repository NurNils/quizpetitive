import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER } from '@angular/cdk/overlay/overlay-directives';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  /** Constructor */
  constructor(private socket: Socket) {}

  createRoom(name){
    this.socket.emit('roomCreateEvent', { name });
  }

  onCreatedRoomEvent(callback){
    this.socket.on('roomCreatedEvent', callback);
  }

  playerJoinEvent(id, name){
    this.socket.emit('playerJoinEvent', { id, name });
  }

  onPlayerJoinedEvent(callback){
    this.socket.on('playerJoinedEvent', callback);
  }

  onJoinedRoom(callback){
    this.socket.on('joinedEvent', callback);
  }

  onGameNotFound(callback){
    this.socket.on('gameNotFoundEvent', callback);
  }

  gameDataChangeEvent(rounds, time, maxPlayers, id){
    this.socket.emit('gameDataChangeEvent', { rounds, time, maxPlayers, id });
  }

  onGameDataChangedEvent(callback){
    this.socket.on('gameDataChangedEvent', callback);
  }

  connect(callback){
    console.log("socket service connect");
    callback();
  }

  playerLeaveEvent(id, playerIndex){
    this.socket.emit('playerLeaveEvent', { id, playerIndex });
  }

  disconnect(){
    this.socket.disconnect();
  }

  onPlayerLeftEvent(callback){
    this.socket.on('playerLeftEvent', callback);
  }

  startGame(maxPlayers, rounds, time, id){
    this.socket.emit('gameStartEvent', { maxPlayers, rounds, time, id });
  }

  onGameStartedEvent(callback){
    this.socket.on('gameStartedEvent', callback);
  }

  onUpdateTimeEvent(updateTimeEvent){
    this.socket.on('gameTimeUpdatedEvent', updateTimeEvent);
  }

  onTimeEndedEvent(callback){
    this.socket.on('gameTimeEndedEvent', callback);
  }

  gameQuestionChooseEvent(category, difficulty, id){
    this.socket.emit('gameQuestionChooseEvent', { category, difficulty, id });
  }

  onGameQuestionChoosenEvent(callback){
    this.socket.on('gameQuestionChoosenEvent', callback);
  }

  gameRandomCategoriesGetEvent(playerIndex, id){
    this.socket.emit('gameRandomCategoriesGetEvent', { playerIndex, id });
  }

  onGameRandomCategoriesGotEvent(callback){
    this.socket.on('gameRandomCategoriesGotEvent', callback);
    // return: data.randomCategories: array[name, easy, medium, hard]
  }

  onErrorEvent(callback){
    // no category or question found
    this.socket.on('errorEvent', callback);
    // return: message
  }

  gameQuestionGuessEvent(playerIndex, answerIndex, id){
    this.socket.emit('gameQuestionGuessEvent', { playerIndex, answerIndex, id });
  }

  onPlayerGuessedEvent(callback){
    this.socket.on('playerGuessedEvent', callback);
  }
}