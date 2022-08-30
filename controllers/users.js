const User = require('../models/user');

const request = require("request");

const key = process.env.API_KEY;

const rootURL = 'https://api.themoviedb.org/3/'

const posterURL = 'https://image.tmdb.org/t/p/w300'

const Url = 'discover/movie?sort_by=popularity.desc&'

module.exports = {
    index,
    show
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
        // console.log(posterURL + movieData.poster_path)
        if(movieData.results.length){
        res.render('index', {movies: movieData.results, user: req.user, posterURL});
        console.log(movieData.results)
        }else{
            res.render('index',{user: req.user})
            console.log("nothing")
        }
        })
    }
      
}

function show(req, res){
    console.log("whatssssssssssssssssssssss")
}


//base url + /search/movie? + apikey + '&query=' + searchterm