'use strict';
var bookCtrl = require('../controllers/book');
var cache = require('apicache').middleware;

module.exports = (router) => {
  router.get('/books', cache('25 minutes'), bookCtrl.list);
  router.post('/books', bookCtrl.create);
  router.get('/books/:id', bookCtrl.get);
  router.put('/books/:id', bookCtrl.update);
  router.delete('/books/:id', bookCtrl.delete);
};