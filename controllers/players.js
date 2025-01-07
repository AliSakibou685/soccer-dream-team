const Player = require('../models/player');
const User = require('../models/user');
const express = require('express');
const router = express.Router();

// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/players'

// GET /players (index functionality) UN-PROTECTED - all users can access
router.get('/', (req, res) => {
  res.render('players/index.ejs');
});

// GET /unicorns/new (new functionality) PROTECTED - only signed in users can access
router.get('/new', ensureSignedIn, (req, res) => {
  res.render('players/new.ejs');
});


// GET /unicorns/new (new functionality) PROTECTED - only signed in users can access
router.get('/players', ensureSignedIn, (req, res) => {
  res.render('players.ejs', { title: 'Players!' })
});

// GET /unicorns/new (new functionality) PROTECTED - only signed in users can access
router.post('/add-player', ensureSignedIn, async(req, res) => {
  try {
    if (req.body.age < 18 ) throw new Error('Player has to be more than 18');
    const player = await Player.create( req.body );
    const players = await Player.find({});
    res.render('unicorns/show-players.ejs', { players: players});
  } catch (e) {
    console.log(e);
    res.render('unicorns/players.ejs');
  }
});


module.exports = router;