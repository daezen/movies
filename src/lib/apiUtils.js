import options from './apiKey'

const IMG_URL = `https://image.tmdb.org/t/p/`
const BG_SIZE = {
  sm: 'w300',
  md: 'w780',
  lg: 'w1280',
  og: 'original',
}
const LOGO_SIZE = {
  xs: 'w45',
  sm: 'w92',
  md: 'w154',
  lg: 'w185',
  xl: 'w300',
  xxl: 'w500',
  og: 'original',
}

async function getRandomMovie() {
  // const res = await fetch('https://api.themoviedb.org/3/movie/845783?language=en-US', options)
  // return await res.json()
  const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  const { results: movies } = await res.json()
  const index = Math.floor(Math.random() * 19)
  return movies[index]
}

async function getMovieDetails(movieId) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos%2Cimages%2Ccredits&language=en`, options)
  const { genres, videos, images, credits } = await res.json()
  return { genres, videos, images, credits }
}

async function getPopularMovies() {}

function getBackdrop(src, size) {
  const backdrop = IMG_URL + BG_SIZE[size || 'md'] + src
  return backdrop
}

function getLogo(images, size) {
  const path = images.logos[0].file_path
  const logo = IMG_URL + LOGO_SIZE[size || 'md'] + path
  return logo
}

function getActors(credits) {
  const actors = credits.cast.filter(actor => actor.known_for_department === 'Acting')
  return actors
}
// const releaseYear = new Date(randomMovie.release_date).getFullYear()

export { getRandomMovie, getMovieDetails, getBackdrop, getLogo, getActors }
