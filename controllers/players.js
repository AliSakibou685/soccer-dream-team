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

//Show
router.get('/:playerId', async (req, res) => {
  const player = await Player.findById(req.params.playerId);
  res.render('players/show.ejs', {title: `Player in ${player.team}`, player});
  });
  


// Post /players (new functionality) PROTECTED - only signed in users can access
router.post('/', ensureSignedIn, async(req, res) => {
  console.log(req.user)
  try {
    req.body.user = req.user._id;
    const player = await Player.create( req.body );
    console.log(player);
    res.redirect('/players');
  } catch (e) {
    console.log(e);
    res.render('players/new.ejs');
  }
});

// DELETE /applications/:id (delete functionality/action)
router.delete('/:id', async (req, res) => {
  req.user.players.pull(req.params.id);
  await req.user.save();
  res.redirect('/players');
}); 


module.exports = router;