const mongoose = require('mongoose');

/** Question schema */
const QUESTION = (module.exports = mongoose.model(
  'Question',
  mongoose.Schema({
    category: String, // Initialisierung; Analyse (Strategie); Konzeption; Realisation; Marketing
    question: String,
    answers: [String],
    rightIndex: Number,
    difficulty: Number // 1=leicht; 2=mittel; 3=schwer
  })
));

/** Get questions */
module.exports.getQuestions = (callback, limit) => {
    QUESTION.find(callback).limit(limit);
};

/** Get questions */
module.exports.getQuestionRandom = (category, difficulty, ids, callback) => {
    QUESTION.find({ category, difficulty, _id: { $nin: ids } }, callback).limit(1);
};

/** Add question */
module.exports.addQuestion = (question, callback) => {
  if (!question._id) {
    question._id = new mongoose.mongo.ObjectID();
  }
  QUESTION.create(question, callback);
};

/** Add questions */
module.exports.addQuestions = (questions, callback) => {
  for(let question of questions) {
    if (!question._id) {
      question._id = new mongoose.mongo.ObjectID();
    }
    question.difficulty = Number(question.difficulty);
    question.rightIndex = Number(question.rightIndex) - 1;
  }
  QUESTION.insertMany(questions, callback);
};

/** Delete question */
module.exports.deleteQuestion = (_id, callback) => {
    QUESTION.deleteOne({ _id }, callback);
};

/** Get question by id */
module.exports.getQuestion = (_id, callback) => {
    QUESTION.findOne({ _id }, callback);
};

/** Update question */
module.exports.updateQuestion = (_id, question, options, callback) => {
  const update = {
    category: question.category,
    question: question.question,
    answers: question.answers,
    rightIndex: question.rightIndex,
    difficulty: question.difficulty, // 1=leicht; 2=mittel; 3=schwer
  };
  ROOM.findOneAndUpdate({ _id }, update, options, callback);
};
