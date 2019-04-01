var express = require('express');
var router = express.Router();
const fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/golf');
var Schema = mongoose.Schema;
//﻿Name,T2G,ATG,Prox,SGP,SGT,Scramble,DD,OFT,Approach,SS,GIR,DA

var statSchema = new Schema({
  Name: String,
  T2G: String,
  ATG: String,
  Prox: String,
  SGP: String,
  SGT: String,
  Scramble: String,
  DD: String,
  OFT: String,
  Approach: String,
  SS: String,
  GIR: String,
  DA: String,
  hole: String
});

var holeSchema = new Schema({
  hole: String,
  name: String,
  details: String
});

var PlayerStats = mongoose.model('stats', statSchema);
var CourseStats = mongoose.model('holes', holeSchema);

//ReceivedUrl = req.url;
/* GET home page. */
router.get('/*', function(req, res, next) {

  ReceivedUrl = req.url;

  if(ReceivedUrl.localeCompare('/') == 0) {
        res.render('home');
      }

    else if (ReceivedUrl.includes('/course')) {
      CourseStats.find()
        .then(function(hole) {
          res.render('course', {holes: hole});
          console.log("hi");
        });
  }

  else if (ReceivedUrl.includes('/index')) {
    PlayerStats.find()
        .then(function(doc) {
          console.log(doc)
    res.render('index', {users: doc});
  });
  };
});

module.exports = router;
