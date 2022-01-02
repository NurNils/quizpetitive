const KEY = process.env.ROUTE_ROOM;
const ROOM = require('./room');
const QUESTION = require('../question/question');

module.exports = (app) => {
    app.get(`/${KEY}/:id`, (req, res) => {
        ROOM.getRoom(req.params.id, (err, room) => {
            if (!err && room) {
                res.status(200).send({ status: 'success', data: room });
            } else {
                res.status(200).send({ status: 'error', message: 'Unable to get room' });
            }
        });
    });
    
    app.post(`/${KEY}/`, (req, res) => {
        let data = req.body;
        data.state = 'LOBBY';
        ROOM.createRoom(data, (err, room) => {
            if(!err && room) {
                res.status(200).send({ status: 'success', data: room });
            } else {
                res.status(200).send({ status: 'error', message: 'Unable to create room' })
            }
        });
    });

    app.put(`/${KEY}/:id/start`, (req, res) => {
        const data = req.body;
        if(data.rounds && data.time) {
            ROOM.startRoom(req.params.id, data.time, data.rounds, (err, room) => {
                if(!err && room) {
                    res.status(200).send({ status: 'success', data: room });
                } else {
                    res.status(200).send({ status: 'error', message: 'Unable to create room' })
                }
            });
        }
    });

    app.put(`/${KEY}/:id/end`, (req, res) => {
        const data = req.body;
        if(data.playerData) {
            ROOM.endRoom(req.params.id, data.playerData, (err, room) => {
                if(!err && room) {
                    res.status(200).send({ status: 'success', data: room });
                } else {
                    res.status(200).send({ status: 'error', message: 'Unable to end room' })
                }
            });
        }
    });

    app.get(`/${KEY}/:id/categories`, (req, res) => {
        ROOM.getRoom(req.params.id, (err, room) => {
            if(!err && room) {
                QUESTION.getQuestions((err, questions) => {
                    if(!err && questions) {
                        let categories = [];
                        for(let question of questions) {
                            if(room.playedQuestions.indexOf(question) !== -1) {
                                let categorysByName = categories.filter((category) => category.name == question.category);
                                
                                if(categorysByName > 0) {
                                    let categoryToUpdate = categorysByName[0];
                                    switch(question.difficulty) {
                                        case 1:
                                            categoryToUpdate.easy++;
                                            break;
                                        case 2:
                                            categoryToUpdate.medium++;
                                            break;
                                        case 3:
                                            categoryToUpdate.hard++;
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
                        if(categories > 3) {
                            do {
                                const randomElement = categories[Math.floor(Math.random() * categories.length)]
                                if(randomCategories.indexOf(randomElement) !== -1) {
                                    randomCategories.push(randomElement);
                                }
                            } while(randomCategories.length < 3);
                        } else {
                            randomCategories = categories;
                        }
                        
                        res.status(200).send({ status: 'success', data: randomCategories })
                    } else {
                        res.status(200).send({ status: 'error', message: 'Unable to find categories' })
                    }
                });
            } else {
                res.status(200).send({ status: 'error', message: 'Unable to find room' })
            }
        });

    });

    app.get(`/${KEY}/:id/question`, (req, res) => {
        const data = req.body;
        if(data.category && data.difficulty) {
            ROOM.getRoom((err, room) => {
                if(!err && room) {
                    QUESTION.getQuestionRandom(data.category, data.difficulty, room.playedQuestions, (err, question) => {
                        if(!err && question) {
                            room.push(question._id);
                            ROOM.updateRoom(room._id, room, { new: true }, (err, room) => {
                                if(!err && room) {
                                    res.status(200).send({ status: 'success', data: question })
                                } else {
                                    res.status(200).send({ status: 'error', message: 'Unable to save question id' })
                                }
                            });
                        } else {
                            res.status(200).send({ status: 'error', message: 'Unable to get random question' })
                        }
                    });
                } else {
                    res.status(200).send({ status: 'error', message: 'Unable to find room' })
                }
            });
        } else {
            res.status(200).send({ status: 'error', message: 'You provided wrong data' })
        }
    });

}