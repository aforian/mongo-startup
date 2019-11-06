const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
// const MongoService = require('../services/MongoService');

/**
 * 
 * @param {object} dependencies
 * @param {MongoService} dependencies.mongoService 
 * @param {MongoClient} client 
 */

function createRouter(dependencies) {
  // dependencies
  const { mongoService } = dependencies;
  // if (!client) {
  //   throw new Error('client is empty');
  // }

  var router = express.Router();

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  router.get('/api/sayHi', function(req, res, next) {
    res.send('hi');
  });

  router.get('/api/mongo', function (req, res, next) {

    mongoService.isConnected()
      .then(isConnected => {
        res.json({ isConnected });
      })
      .catch(next);
  });

  router.post('/api/echo', function(req, res, next) {
    const { body } = req;

    mongoService.insertEcho(body)
      .then(() => {
        res.json({
          ...body,
          success: true,
        });
      })
      .catch(next); 
  });

  return router;
}
module.exports = {
  createRouter
}
