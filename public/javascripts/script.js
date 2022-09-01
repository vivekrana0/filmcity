// const key = process.env.API_KEY;
const moviesEl = document.querySelectorAll(".movie")
const buttonEl = document.getElementById("wishlistBtn")
const trailerbtnEl = document.getElementById("trailer")
const viewEl = document.querySelector(".trailer_container")
const closeEl = document.querySelector(".close")

moviesEl.forEach(function(movieEl){
    movieEl.addEventListener("click", function(e){
       const movieId = e.target.dataset.movieId.trim()
    //    const movieUrl = "https://api.themoviedb.org/3/movie/361743?api_key=4f9d221d79f600199cb762f0682d419b"
       window.location = "/movies/" + movieId
       
    })
})
// trailerbtnEl.addEventListener("click", function(event){
//    viewEl.classList.add("active")
//    // const movieId = event.target.dataset.movieId
//    // console.log(movieId)
// })

// closeEl.addEventListener("click", function(){
//    viewEl.classList.remove("active")
// })