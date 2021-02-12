var express = require('express');
var router = express.Router();
require('../models/connection');
var userModel = require('../models/users');
var bcrypt = require('bcrypt');
var uid2 = require('uid2');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Sign-Up avec erreur si le user existe déjà
router.post('/sign-up', async function (req, res, next) {

  var result = false

  var alreadyExist = await userModel.findOne({
    email: req.body.emailFromFront
  })
  console.log(alreadyExist)

  let error = ''
  if (req.body.usernameFromFront == ''
    || req.body.emailFromFront == ''
    || req.body.passwordFromFront == '') {
    error = 'Fill all the input please'
    result = false
  } else {
    if (alreadyExist) {
      error = "We couldn't manage to sign you up!"
      result = false
    } else {
      var cost = 10;
      var hash = bcrypt.hashSync(req.body.passwordFromFront, cost);
      var newUser = new userModel({
        username: req.body.usernameFromFront,
        email: req.body.emailFromFront,
        password: hash,
        token: uid2(32)
      });
      var userSave = await newUser.save();
      if (userSave.id) {
        result = true
        token = userSave.token
      } else {
        result = false
      }
    }
  }
  res.json({ userSave, result, error, token })
});

// Sign-In 
router.get('/sign-in', async function (req, res, next) {
  var result = false
  var userFound = await userModel.findOne({
    email: req.query.emailFromFront,
  });

  var password = req.query.passwordFromFront;

  if (bcrypt.compareSync(password, userFound.password)) {
    token = userFound.token;
    result = true
  }

  let error = ''
  if (req.query.emailFromFront == ''
    || req.query.passwordFromFront == '') {
    error = 'Fill all the input please'
  }
  res.json({ userFound, result, error, token })
});


module.exports = router;
