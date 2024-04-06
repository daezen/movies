import options from '../lib/api'
const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
const { results: movies } = await res.json()

const randomNumber = Math.floor(Math.random() * 19)
const randomMovie = movies[randomNumber]

const IMG_SIZE = {
  small: 'w300/',
  medium: 'w780/',
  large: 'w1280/',
  og: 'original/',
}
const IMG_URL = `https://image.tmdb.org/t/p/`

const imagesRes = await fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}/images?language=en-US&include_image_language=en`, options)
const { logos } = await imagesRes.json()

const movieRating = (randomMovie.vote_average / 10) * 100
const releaseYear = new Date(randomMovie.release_date).getFullYear()

const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}/credits?language=en-US`, options)
const { cast } = await creditsRes.json()

const detailsRes = await fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}?language=en-US`, options)
const { genres } = await detailsRes.json()

const movieBackdrop = size => `${IMG_URL}${IMG_SIZE[size]}${randomMovie.backdrop_path}`
const logoSrc = `${IMG_URL}${IMG_SIZE.medium}${logos[0].file_path}`

export { movies, randomMovie, logoSrc, movieBackdrop, cast, movieRating, genres, releaseYear, IMG_URL, IMG_SIZE }
