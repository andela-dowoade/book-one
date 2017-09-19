'use strict';
var authCtrl = require('../authentication/auth');

module.exports = (router) => {
  router.post('/users/login',authCtrl.authenticate);

  router.post('/users/logout', (req, res) => {
    res.status(200).json({
      'message': 'Goodbye'
    });
  });

  router.get('/users/session', authCtrl.session);
};
