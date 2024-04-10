import options from '../lib/api'
const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
const { results: movies } = await res.json()
const randomMovie = movies[Math.floor(Math.random() * 19)]

const IMG_URL = `https://image.tmdb.org/t/p/`
const POSTER_SIZE = {
  small: 'w300/',
  medium: 'w780/',
  large: 'w1280/',
  og: 'original/',
}

const details = await fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}?append_to_response=videos%2Cimages%2Ccredits&language=en`, options)
const { genres, videos, images, credits } = await details.json()

const cast = credits.cast.filter(actor => actor.known_for_department === 'Acting').slice(0, 6)
const backdrop = size => IMG_URL + POSTER_SIZE[size] + randomMovie.backdrop_path
const logo = size => IMG_URL + POSTER_SIZE[size] + images.logos[0].file_path
const releaseYear = new Date(randomMovie.release_date).getFullYear()
const rating = (randomMovie.vote_average / 10) * 100

export { randomMovie, rating, releaseYear, genres, cast, backdrop, logo }
