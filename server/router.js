const express = require('express'),
  passport = require('passport'),
  LoadCsvController = require('./controllers/load/csv'),
  CommentController = require('./controllers/comment'),
  config = require('./config/main'),
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

  // Update removal count for accident
  accidentsRoutes.put('/:id/remove', AccidentController.updateRemovalCount);

  // Mark accident to be removed
  accidentsRoutes.delete('/:id', AccidentController.deleteAccident);
  // - -----------------------

  //= ========================
  // Login Routes
  //= ========================


  //= ========================
  // Loader Routes
  //= ========================
  accidentsRoutes.use('/load', loadRoutes);

  // Load a CSV file
  loadRoutes.post('/csv/gov', LoadCsvController.loadCsvFileFromGovAndSave);
  // - -----------------------


  //= ========================
  // Comments Routes
  //= ========================
  // Add new comment
  accidentsRoutes.post('/:id/comments', CommentController.addNewCommentToAccident);
  // - -----------------------


  // Set url for API group routes
  app.use(config.apiPath, apiRoutes);
};
