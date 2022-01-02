const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const request = require('request');
const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const ROOM = require('./src/models/room/room');
const QUESTION = require('./src/models/question/question');

const production = process.env.PRODUCTION === 'true';
const port = process.env.PORT;

/**********************
 * Socket connection
 **********************/

const playingRooms = [];

io.on('connection', socket => {
  let intervals = [];

  let roomId = 0;
  let playerIndex = -1;

  socket.on('disconnect', () => {
    for(let interval of intervals) {
      clearInterval(interval);
    }
    for(let room of playingRooms) {
      if(room._id == roomId) {
        for(let i = 0; i < room.playerData.length; i++){
          if(room.playerData[i].index == playerIndex) {
            const isChoosing = room.playerIndex === room.playerData[i].index; 
            
            if(isChoosing) {
                let playerIds = [];
                let playerNotPlayed = [];
                for(let playerData of room.playerData) {
                    playerIds.push(playerData.index);
                    if(playerData.index > room.playerIndex) {
                        playerNotPlayed.push(playerData.index);
                    }
                }      

                if(playerNotPlayed.length > 0) {
                    room.playerIndex = playerNotPlayed[0];
                } else {
                    room.playerIndex = playerIds[0];
                    if(room.currentRound <= room.rounds) {
                        room.currentRound++;
                    }
                }   
                io.to(room._id).emit('playerLeftEvent', { data: { playerData: room.playerData[i], state: room.state, isChoosing, playerIndex: room.playerIndex, rounds: room.currentRound }});
              } else {
                io.to(room._id).emit('playerLeftEvent', { data: { playerData: room.playerData[i], state: room.state, isChoosing }});
              }
            room.playerData.splice(i, 1);
            break;
          }
        }
        if(room.host === playerIndex) {
          // TODO: Check new host and set new host
        }
        return;
      }
    }
  });

  socket.on('roomCreateEvent', data => {
    if(data && data.name) {
      ROOM.addRoom({
        dates: {
          start: new Date(),
          end: null,
        },
        playerData: [{ index: 0, name: data.name, points: 0, currentGuess: -1 }]
      }, (err, room) => {
        roomId = room._id;
        playerIndex = 0;
        playingRooms.push(room);
        socket.join(room._id);
        socket.emit('roomCreatedEvent', { data: { id: room._id, name: data.name, playerIndex }});
      });
    }
  });

  socket.on('playerJoinEvent', data => {
    if(data && data.id && data.name) {
      for(let room of playingRooms) {
        if(room._id == data.id && room.state === 'LOBBY' && room.maxPlayers > room.playerData.length) {
          roomId = room._id;
          playerIndex = room.playerData.length;
          room.playerData.push({ index: playerIndex, name: data.name, points: 0, currentGuess: -1 });
          socket.emit('joinedEvent', { data: { room, name: data.name, playerIndex }});
          io.to(room._id).emit('playerJoinedEvent', { data: { name: data.name, playerIndex }});
          socket.join(room._id);
          return;
        }
      }
      socket.emit('gameNotFoundEvent', { data: { id: data.id }});
      socket.disconnect();
    }
  });

  socket.on('playerLeaveEvent', data => {
    if(data && data.id && data.playerIndex) {
      for(let room of playingRooms) {
        if(room._id == data.id) {
          let i = -1;
          for(let playerData of room.playerData) {
            i++;
            if(playerData.index == data.playerIndex) {
              const isChoosing = room.playerIndex === playerData.index;
              room.playerData.splice(i, 1);

              if(isChoosing) {
                let playerIds = [];
                let playerNotPlayed = [];
                for(let playerData of room.playerData) {
                    playerIds.push(playerData.index);
                    if(playerData.index > room.playerIndex) {
                        playerNotPlayed.push(playerData.index);
                    }
                }      

                if(playerNotPlayed.length > 0) {
                    room.playerIndex = playerNotPlayed[0];
                } else {
                    room.playerIndex = playerIds[0];
                    if(room.currentRound <= room.rounds) {
                        room.currentRound++;
                    }
                }   
                io.to(room._id).emit('playerLeftEvent', { data: { playerData, state: room.state, isChoosing, playerIndex: room.playerIndex, rounds: room.currentRound }});
              } else {
                io.to(room._id).emit('playerLeftEvent', { data: { playerData, state: room.state, isChoosing }});
              }

           }
            break;
          }
          return;
        }
      }
      socket.disconnect();
    }
  });

  socket.on('gameDataChangeEvent', data => {
    if(data && data.id && data.maxPlayers && data.time && data.rounds) {
      for(let room of playingRooms) {
        if(room._id == data.id) {
          room.maxPlayers = data.maxPlayers;
          room.time = data.time;
          room.rounds = data.rounds;
          io.to(room._id).emit('gameDataChangedEvent', { data: { maxPlayers: room.maxPlayers, time: room.time, rounds: room.rounds }});
        }
      } 
    }
  });

  socket.on('gameStartEvent', data => {
    if(data && data.id && data.rounds && data.time) {
      for(let room of playingRooms) {
        if(room._id == data.id) {
          room.state = 'INGAME';
          room.rounds = data.rounds;
          room.time = data.time;
          room.playerIndex = 0;
          io.to(room._id).emit('gameStartedEvent', { data: { playerIndex: room.playerIndex, playerData: room.playerData }});
          return;
        }
      } 
    }
  });

  socket.on('gameRandomCategoriesGetEvent', data => {
    if(data && data.id) {
      for(let room of playingRooms) {
        if(room._id == data.id) {
          if(room.playerIndex === data.playerIndex) {
            QUESTION.getQuestions((err, questions) => {
              if(!err && questions) {
                let categories = [];
                for(let question of questions) {
                  question._id = new Date().getMilliseconds() + Math.random() + "";
                  if(room.playedQuestions.indexOf(question._id) === -1) {
                    let categorysByName = categories.filter((category) => category.name == question.category);
                    if(categorysByName.length > 0) {
                      question.difficulty = parseInt(question.difficulty);
                      switch(question.difficulty) {
                        case 1:
                          categorysByName[0].easy++;
                          break;
                        case 2:
                          categorysByName[0].medium++;
                          break;
                        case 3:
                          categorysByName[0].hard++;
                          break;
                        default:
                          break;
                      }
                    } else {   
                        let category = {
                          name: question.category,
                          easy: 0,
                          medium: 0,
                          hard: 0,
                        }
        
                        switch(question.difficulty) {
                          case 1:
                            category.easy++;
                            break;
                          case 2:
                            category.medium++;
                            break;
                          case 3:
                            category.hard++;
                            break;
                          default:
                            break;
                        }
                        categories.push(category);                    
                    }
                  }
                }
        
                let randomCategories = [];

                if(categories.length > 3) { 
                  do {
                    const randomElement = categories[Math.floor(Math.random() * categories.length)]
                    if(randomCategories.indexOf(randomElement) === -1) {
                      randomCategories.push(randomElement);
                    }
                  } while(randomCategories.length < 3);
                } else {
                  randomCategories = categories;
                }
                socket.emit('gameRandomCategoriesGotEvent', { randomCategories });
              } else {
                io.to(room._id).emit('errorEvent', { message: 'Unable to find random categories' });
              }
            });
          }
          return;
        }
      } 
    }
  });

  socket.on('gameQuestionChooseEvent', data => {
    if(data && data.id && data.category && data.difficulty) { 
      for(let room of playingRooms) {
        if(room._id == data.id) {
          QUESTION.getQuestionRandom(data.category, data.difficulty, room.playedQuestions, (err, questions) => {
            if(!err && questions && questions.length > 0) {
            let min = Math.ceil(0);
            let max = Math.floor(questions.length);
            let question;
            do {
              question = questions[Math.floor(Math.random() * (max - min + 1)) + min];
            } while(!question);
            
              room.playedQuestions.push(question._id);
              io.to(room._id).emit('gameQuestionChoosenEvent', { data: { question } });
                
              room.currentTime = room.time;
              let timer = setInterval(() => {
                room.currentTime--;
                if(room.currentTime == -1) {    
                    let playerIds = [];
                    let playerNotPlayed = [];
                    for(let playerData of room.playerData) {
                        playerIds.push(playerData.index);
                        if(playerData.index > room.playerIndex) {
                            playerNotPlayed.push(playerData.index);
                        }
                    }      

                    if(playerNotPlayed.length > 0) {
                        room.playerIndex = playerNotPlayed[0];
                    } else {
                        room.playerIndex = playerIds[0];
                        if(room.currentRound <= room.rounds) {
                            room.currentRound++;
                        }
                    }
                    for(let playerData of room.playerData) {
                        if(playerData.currentGuess === question.rightIndex) {
                            playerData.points += question.difficulty * 100;
                        }
                        playerData.currentGuess = -1;
                    }
                    clearInterval(timer);
                    room.state = "ENDED";
                    const ending = room.currentRound > room.rounds;
                    if(ending) {
                        //TODO: Save room in db
                    }
                    io.to(data.id).emit('gameTimeEndedEvent', { data: { room, ending, rightIndex: question.rightIndex } });
                } else {
                  io.to(data.id).emit('gameTimeUpdatedEvent', { data: { time: room.currentTime } });
                }
              }, 1000);
              return;
            } else {
              io.to(room._id).emit('errorEvent', { message: 'Unable to get random question' });
            }
          });
          return;
        }
      } 
    }
  });

  socket.on('gameQuestionGuessEvent', data => {
    if(data && data.id) {
      for(let room of playingRooms) {
        if(room._id == data.id) {
          let guessedPlayers = 0;
          for(let playerData of room.playerData) {
            if(playerData.index == data.playerIndex) {
              playerData.currentGuess = data.answerIndex;
              io.to(room._id).emit('playerGuessedEvent', { data: { playerIndex: data.playerIndex }});
            }
            if(playerData.currentGuess != -1) {
              guessedPlayers++;
            }
          }
          if(guessedPlayers == room.playerData.length) {
            room.currentTime = 0;
          }
          return;
        }
      } 
    }
  });
});

/**********************
 * Init server & connect to db
 **********************/

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
if(production) {
  mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}:${process.env.DB_PORT}/${process.env.DB_TABLE}?authSource=admin`);
} else {
  mongoose.connect(`mongodb://${process.env.DB_DOMAIN}:${process.env.DB_PORT}/${process.env.DB_TABLE}`);
}

http.listen(port, () => {
  console.log(`Server (Production Mode: ${production}) is running on port ${port}...`);
});