'use strict';
var bookModel = require('../models/book');

var BookCtrl = class {
  create(req, res) {
    bookModel.create({
      title: req.body.title ? encodeURI(req.body.title) : undefined,
      published: req.body.published,
      excerpt: req.body.excerpt ? encodeURI(req.body.excerpt) : undefined
    }).then(function(book) {
      res.status(201).json(book);
    }).catch(function() {
      res.status(400).json({ message: 'invalid request params' });
    });
  }

  update(req, res) {
    bookModel.upsert({
      id: req.params.id,
      title: req.body.title ? encodeURI(req.body.title) : undefined,
      published: req.body.published,
      excerpt: req.body.excerpt ? encodeURI(req.body.excerpt) : undefined
    }).then(function(book) {
      res.status(200).json(book);
    }).catch(function() {
      res.status(400).json({ message: 'invalid request params' });
    });
  }

  list(req, res) {
    bookModel.find(req.query).limit(req.query.limit).then(function(books) {
      res.status(200).json(books);
    }).catch(function() {
      res.status(400).json({ message: 'invalid request params' });
    });
  }

  get(req, res) {
    bookModel.findById({ id: req.params.id }).then(function(book) {
      if (!book) {
        res.status(404).json(book);
      } else {
        res.status(200).json(book);
      }
    }).catch(function() {
      res.status(400).json({ message: 'invalid request params' });
    });
  }

  delete(req, res) {
    bookModel.findById({ id: req.params.id }).then(function(book) {
      if (!book) {
        res.status(404).json(book);
      } else {
        bookModel.remove({ id: req.params.id }).then(function() {
          res.status(204).json({ message: 'Deleted' });
        });
      }
    }).catch(function() {
      res.status(400).json({ message: 'invalid request params' });
    });
  }
};

module.exports = new BookCtrl();