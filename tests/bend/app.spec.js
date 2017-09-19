/*User Spec: contains tests for user controllers and routes.*/
'use strict';
process.env.NODE_ENV = 'testing';
var moment = require('moment'),
  mockgoose = require('mockgoose'),
  request = require('superagent'),
  path = 'http://localhost:3000',
  async = require('async');

describe('User', () => {
  beforeAll(() => {
    console.log('Running user test suite');
  });

  it('should /', (done) => {
    request.get(path + '/api/')
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});