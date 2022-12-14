const User = require('../models/user');

const request = require("request");

const key = process.env.API_KEY;

const rootURL = 'https://api.themoviedb.org/3/'

const posterURL = 'https://image.tmdb.org/t/p/w300'

const Url = 'discover/movie?sort_by=popularity.desc&'

module.exports = {
    index,
}


function index(req, res, next){
    const movie = req.query.title
    if(!movie){
        const options = {
            url: `${rootURL}${Url}api_key=${key}` 
        }
        request(options, function(err, response, body){
            const movieData = JSON.parse(body)
            res.render('index', {movies: movieData.results, user: req.user, posterURL});
            
            
        })
        
    }else{
    const options = {
       url: `${rootURL}search/movie?api_key=${key}&query=${movie}`
    }
    request(options, function(err, response, body){
        const movieData = JSON.parse(body)
        if(movieData.results.length){
        res.render('index', {movies: movieData.results, user: req.user, posterURL});
        }else{
            res.render('index', {movies: movieData.results, user: req.user, posterURL});
        }
        })
    }
      
}



//base url + /search/movie? + apikey + '&query=' + searchterm