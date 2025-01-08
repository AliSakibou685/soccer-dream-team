const Player = require('../models/player');
const User = require('../models/user');
const express = require('express');
const router = express.Router();

// Middleware to protect selected routes
const ensureSignedIn = require('../middleware/ensure-signed-in');

// All routes start with '/players'

// GET /players (index functionality) UN-PROTECTED - all users can access
router.get('/', async (req, res) => {
  const players = await Player.find({user: req.user._id})
  res.render('players/index.ejs', {title: 'My Dream Team', players});
});

// GET /players/new (new functionality) PROTECTED - only signed in users can access
router.get('/new', ensureSignedIn, (req, res) => {
  res.render('players/new.ejs');
});




// GET /new (new functionality) PROTECTED - only signed in users can access
router.post('/', ensureSignedIn, async(req, res) => {
  try {
    req.body.user = req.user._id;
    const player = await Player.create( req.body );
    console.log(players);
    res.redirect('/players');
  } catch (e) {
    console.log(e);
    res.render('players/new.ejs');
  }
});


module.exports = router;