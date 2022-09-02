const User = require('../models/user');

const request = require("request");

const key = process.env.API_KEY;

const rootURL = 'https://api.themoviedb.org/3/'

const posterURL = 'https://image.tmdb.org/t/p/w300'

const Url = 'discover/movie?sort_by=popularity.desc&'

module.exports = {
    show,
    add,
    watchlist,
    delete: deleteMovie,
    trailer
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
        const options2 = {
            url: `${rootURL}movie/${movieId}/reviews?api_key=${key}` 
        }
        request(options2, function(err, response, body){
            const reviewData = JSON.parse(body).results
            if(req.user){
                User.findById(req.user.id, function(err, user){
                    let isOne = user.watchlist.some(function(e){
                        return e.id == movieId
                        
                    })
                    res.render("movies", {posterPath, rating, movieTitle, movieId, user: req.user, movieOverview, homepage, tagline, isOne, reviewData})
                })
    
            }else{
                res.redirect("/auth/google")
            }
        
            
        })
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
            if(err) res.redirect("/")
            res.redirect(`/movies/${movieId}`)
        })
        })
           
})   
}

function watchlist(req, res){
    User.findById(req.params.id, function(err, user){
        const movies = user.watchlist;
        res.render("watchlist", {movies, user:req.user, posterURL})
    })
}

function deleteMovie(req, res){
    User.findById(req.user.id, function(err, user){
       const index = user.watchlist.findIndex(function(movie){
            return movie.id == req.params.id
        })
        user.watchlist.splice(index, 1)
        user.save(function(err){
        res.redirect(`/movies/${user.id}/watchlist`)
        })
        
    })
}

function trailer(req, res){
    movieId = req.params.id
    const options = {
        url: `${rootURL}movie/${movieId}/videos?api_key=${key}` ,
    }
    console.log(options)
    request(options, function(err, response, body){
        const movieData = JSON.parse(body)
        console.log(body)
        const movieArray = movieData.results
        const movieObj = movieArray.find(function(e){
            return e.type === "Trailer"
        })
        const videoKey = movieObj.key
        res.render("trailer", {videoKey, user: req.user, movieId})
        })
}