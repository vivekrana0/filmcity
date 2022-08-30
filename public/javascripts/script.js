// const key = process.env.API_KEY;
const moviesEl = document.querySelectorAll(".movie")
const buttonEl = document.getElementById("wishlistBtn")

moviesEl.forEach(function(movieEl){
    movieEl.addEventListener("click", function(e){
       const movieId = e.target.dataset.movieId.trim()
    //    const movieUrl = "https://api.themoviedb.org/3/movie/361743?api_key=4f9d221d79f600199cb762f0682d419b"
       window.location = "/movies/" + movieId
       
    })
})

