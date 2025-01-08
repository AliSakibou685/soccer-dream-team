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

// Get /players/:id (show functionality/action)
router.get('/:playerId', async (req, res) => {
  const player = await Player.findById(req.params.playerId);
  res.render('players/show.ejs', {title: `Detail for player ${player.name}`, player});
  });
  


// Post /players (Create functionality) PROTECTED - only signed in users can access
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

// DELETE /players/:id (delete functionality/action)
router.delete('/:id', async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.redirect('/players');
}); 
// GET /players/:id/edit (edit functionality/action)
router.get('/:id/edit', async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.render('players/edit.ejs', {title: `Edit player ${player.name}`, player});
});

// PUT /players/:id (update functionality)
router.put ('/:id', async (req, res) => {
  try { 
    await Player.findByIdAndUpdate(req.params.id, req.body );
    res.redirect(`/players/${req.params.id}`);
  } catch (e) {
    console.log(e);
    res.redirect('/players');
  }
});


module.exports = router;