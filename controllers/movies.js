const User = require('../models/user');

const request = require("request");

const key = process.env.API_KEY;

const rootURL = 'https://api.themoviedb.org/3/'

const posterURL = 'https://image.tmdb.org/t/p/w300'

const Url = 'discover/movie?sort_by=popularity.desc&'

module.exports = {
    show,
    add,
    watchlist
}

function show(req, res){
    const movieId = req.params.id
    const options = {
        url: `${rootURL}movie/${movieId}?api_key=${key}` 
    }
    request(options, function(err, response, body){
        const movieData = JSON.parse(body)
        const posterPath = posterURL + movieData.poster_path
        const rating = movieData.vote_average
        const movieTitle = movieData.original_title
        const movieOverview = movieData.overview
        const homepage = movieData.homepage
        const tagline = movieData.tagline
        console.log(homepage)
        res.render("movies", {posterPath, rating, movieTitle, movieId, user: req.user, movieOverview, homepage, tagline})
    })
}

function add(req, res){
    const movieId = req.params.id
    User.findById(req.user.id, function(err, user){

    const options = {
        url: `${rootURL}movie/${movieId}?api_key=${key}` 
    }
    request(options, function(err, response, body){
        const movieData = JSON.parse(body)
        user.watchlist.push(movieData)
        user.save(function(err){
            res.redirect(`/movies/${movieId}`)
        })
        })
    
})   
}

function watchlist(req, res){
    User.findById(req.params.id, function(err, user){
        const movies = user.watchlist;
        res.render("watchlist", {movies, user, posterURL})
    })
}