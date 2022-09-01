var express = require('express');
var router = express.Router();
const passport = require('passport');
var moviesCtrl = require('../controllers/movies')


/* GET users listing. */
router.get('/:id', moviesCtrl.show);
router.get('/:id/movie', moviesCtrl.add)
router.get('/:id/watchlist', moviesCtrl.watchlist)
router.get('/:id/watchlist/delete', moviesCtrl.delete)
router.get('/:id/trailer', moviesCtrl.trailer)

module.exports = router;
