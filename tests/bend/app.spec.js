/*User Spec: contains tests for user controllers and routes.*/
'use strict';
process.env.NODE_ENV = 'testing';
var moment = require('moment'),
  mockgoose = require('mockgoose'),
  request = require('superagent'),
  path = 'http://localhost:4000',
  async = require('async');

describe('User', () => {
  beforeAll(() => {
    console.log('Running user test suite');
  });

  it('should /', (done) => {
    request.get(path + '/api/v1')
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should it should not return detail for wrong value', (done) => {
    request.get(path + '/api/v1/books/gh')
      .end((err, res) => {
        expect(res.status).toBe(400);
        done();
      });
  });

  it('should it should not return not existent', (done) => {
    request.get(path + '/api/v1/books/5000')
      .end((err, res) => {
        expect(res.status).toBe(404);
        done();
      });
  });

  it('should /books', (done) => {
    request.get(path + '/api/v1/books')
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});