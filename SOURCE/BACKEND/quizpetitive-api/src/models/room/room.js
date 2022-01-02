const mongoose = require('mongoose');

/** Room schema */
const ROOM = (module.exports = mongoose.model(
  'Room',
  mongoose.Schema({
    dates: {
        start: Date,
        end: Date,
    },
    state: { type: String, default: 'LOBBY' }, //LOBBY; INGAME; FINISHED
    rounds: { type: Number, default: 5 },
    time: { type: Number, default: 60 },
    maxPlayers: { type: Number, default: 5 },
    playedQuestions: { type: [String], default: [] },
    playerData: [{
        name: String,
        points: Number
    }]
  })
));

/** Get rooms */
module.exports.getRooms = (callback, limit) => {
    ROOM.find(callback).limit(limit);
};

/** Add room */
module.exports.addRoom = (room, callback) => {
  if (!room._id) {
    room._id = new mongoose.mongo.ObjectID();
  }
  ROOM.create(room, callback);
};

/** Delete room */
module.exports.deleteRoom = (_id, callback) => {
    ROOM.deleteOne({ _id }, callback);
};

/** Get room by id */
module.exports.getRoom = (_id, callback) => {
    ROOM.findOne({ _id }, callback);
};

/** STart room */
module.exports.startRoom = (_id, time, rounds, options, callback) => {
    const update = {
      dates: {
          start: Date.now(),
          end: null,
      },
      state: 'INGAME',
      rounds,
      time,
    };
    ROOM.findOneAndUpdate({ _id }, update, options, callback);
};

/** End room */
module.exports.endRoom = (_id, playerData, options, callback) => {
    ROOM.findOneAndUpdate({ _id }, { state: 'FINISHED', 'dates.end': Date.now(), playerData }, options, callback);
};

/** Update room */
module.exports.updateRoom = (_id, room, options, callback) => {
  const update = {
    dates: room.dates,
    state: room.state,
    rounds: room.rounds,
    time: room.time,
    playedQuestions: room.playedQuestions,
    playerData: room.playerData,
  };
  ROOM.findOneAndUpdate({ _id }, update, options, callback);
};
