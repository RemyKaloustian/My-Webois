const express = require('express'),
  passport = require('passport'),
  LoadCsvController = require('./controllers/load/csv'),
  CommentController = require('./controllers/comment'),
  AccidentController = require('./controllers/accident');

module.exports = function (app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
    accidentsRoutes = express.Router(),
    commentsRoutes = express.Router(),
    loadRoutes = express.Router();

  //= ========================
  // Accidents Routes
  //= ========================
  apiRoutes.use('/accidents', accidentsRoutes);

  // Get all accidents || nearest
  accidentsRoutes.get('/', AccidentController.getAllAccidents);
  
  // Get one accident by id
  accidentsRoutes.get('/:id', AccidentController.getOneAccidentById);
  
  // Add new accident
  accidentsRoutes.post('/', AccidentController.addNewAccident);
  //- -----------------------



  //= ========================
  // Loader Routes
  //= ========================
  accidentsRoutes.use('/load', loadRoutes);

  // Load a CSV file
  loadRoutes.post('/csv', LoadCsvController.loadCsvFileAndSave);
  //- -----------------------

  

  //= ========================
  // Comments Routes
  //= ========================
  // Add new comment
  accidentsRoutes.post('/:id/comments', CommentController.addNewCommentToAccident);
  //- -----------------------



  // //= ========================
  // // Game Users Routes
  // //= ========================
  // gameRoutes.use('/user', gameUserRoutes);

  // // Add user to a game
  // gameUserRoutes.post('/:pos', UserController.newUserForGame);

  // //= ========================
  // // Users Routes
  // //= ========================
  // apiRoutes.use('/user', userRoutes);

  // // Update user position & lap
  // userRoutes.put('/', UserController.updatePositionAndLapForUser);

  // // Update user position & lap
  // userRoutes.put('/points', UserController.addPointsToUser);

  // // Get all users for a game
  // userRoutes.get('/:gameId', UserController.allUsersForGame);

  // // Get all users for a game
  // userRoutes.get('/:gameId/:pos', UserController.userForGameAndPosition);
  // //= ========================


  // Set url for API group routes
  app.use('/api', apiRoutes);
};