<!-- Logo -->
![Quizpetitive Logo](/PROJECT/assets/logo.png)

# Quizpetitive
A quiz game to learn new knowledge and terms in the field of project management. The key element to the success of this project was the collaboration and communication of different teams.

<!-- Buttons -->
[![GitHub Repo stars](https://img.shields.io/github/stars/NurNils/quizpetitive?style=social)](https://github.com/NurNils/quizpetitive)

<!-- Devices -->
![Quizpetitive Home](/PROJECT/assets/home.jpg?raw=true)

## About
This project was developed by Nils-Christopher Wiesenauer ([NurNils](https://github.com/NurNils)), Namid Marxen ([NurNils](https://github.com/NamidM)), Philipp Förster ([PhilippFoerster](https://github.com/PhilippFoerster)), Daniel Zichler ([Clawset](https://github.com/Clawset)) and Elian Yildirim ([elian15122000](https://github.com/elian15122000)) during the 2nd semester as part of the project management II lecture at DHBW Stuttgart. The main purpose of this web application is to create a quiz game to learn new knowledge and terms in the field of project management.

💚 The system is based on the MEAN (MongoDB, Express.js, Angular, Node.js)-Stack with the CRUD (Create, Read, Update, Delete) functionality in the backend.

💬 Socket.IO is used to create a low-latency communication between all platforms for a live multiplayer gameplay. [More info](https://socket.io/)

## Table of Contents

- [Installation and Usage](#Installation-and-Usage)
  - [Frontend](#Frontend)
  - [Backend](#Backend)
  - [Crawler](#Crawler)
- [Technologies](#Technologies)
  - [MongoDB](#MongoDB)
  - [Express.js](#Expressjs)
  - [Angular](#Angular)
  - [Node.js](#Nodejs)

## Installation and Usage

### Frontend

The Quizpetitve App was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7 [More Info](/SOURCE/FRONTEND/tradingcardprice-app)

1. Run `npm install` to download all needed packages and it's dependencies.

2. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

3. Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Backend

The Quizpetitive API was created with [Node.js](https://nodejs.org/) version 12.16.x. [More Info](/SOURCE/BACKEND/quizpetitive-api)

1. Run `npm install` to download all needed packages and it's dependencies.

2. Go to the API folder and create a `.env` file with the following content (update if necessary):
```javascript
PRODUCTION=false
PORT=3000
DB_PORT=27017
DB_DOMAIN="localhost"
DB_TABLE="quizpetitive"
DB_USER="username"
DB_PASSWORD="password"
```

3. Run `npm start` for a Node.js server. Navigate to `http://localhost:3000/` or defined port in `.env` file. The app will automatically reload if you change any of the source files because of [nodemon](https://nodemon.io/).

### Socket

The Quizpetitive Socket was created with [Socket.IO](https://socket.io/) and [Node.js](https://nodejs.org/) version 12.16.x. [More Info](/SOURCE/BACKEND/quizpetitive-api)

1. Run `npm install` to download all needed packages and it's dependencies.

2. Go to the API folder and create a `.env` file with the following content (update if necessary):
```javascript
PRODUCTION=false
PORT=4444
DB_PORT=27017
DB_DOMAIN="localhost"
DB_TABLE="quizpetitive"
DB_USER="username"
DB_PASSWORD="password"
```

3. Run `npm start` for a Node.js server. Navigate to `http://localhost:4444/` or defined port in `.env` file. The app will automatically reload if you change any of the source files because of [nodemon](https://nodemon.io/).

## Technologies

The system is based on the MEAN (MongoDB, Express.js, Angular, Node.js)-Stack with the CRUD (Create, Read, Update, Delete) functionality in the backend.

### MongoDB

MongoDB is a document-oriented NoSQL database used for high volume data storage.

### Express.js

Express.js is the most popular Node web framework and is the underlying library for several other popular Node web frameworks. It provides many mechanisms.

### Angular

Angular is a TypeScript based front-end framework which is published as open source software.

### Node.js

Node.js is a JavaScript free and open source cross-platform for server-side programming that allows users to build network applications quickly.