import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  timer: number = 15;
  playing: boolean = false;
  waiting: boolean = false;
  ended: boolean = false;
  gameNotFound: boolean = false;
  ownPlayerIndex: number;
  ownPlayerName: string;
  roomId: string;
  currentRound: number = 1;
  choosenDifficulty: number;
  choosenCategory: { name: string, hard: number, medium: number, easy: number } = {name: undefined, hard: undefined, medium: undefined, easy: undefined};
  currentQuestion: { question: string, answers: string[], category: string, difficulty: number };
  currentGuess: number;
  currentAnswer: number = -1;
  room: boolean = true;
  currentChooser: number;

  rounds: number = 5;
  maxPlayers: number = 5;
  maxTime: number = 15;

  isChoosing: boolean = false;
  hasAnswered: boolean = false;
  categories: {name: string, hard: number, medium: number, easy: number}[] = [];
  playerData: { index: number, name: String, points: number } [] = [];
  winners: { index: number, name: String, points: number } [] = [];
  guessedPlayers: number[] = [];
  constructor() {
  }

  clear(){
    this.timer = 15;
    this.rounds = 5;
    this.maxPlayers = 8;
    this.playerData = [];
    this.categories = [];
    this.guessedPlayers = [];
    this.currentAnswer = -1;
    this.currentQuestion = undefined;
    this.currentGuess = -1;
    this.currentRound = -1;
  }
}