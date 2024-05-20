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
  const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  const { results: movies } = await res.json()
  const index = Math.floor(Math.random() * 19)
  const details = await getMovieDetails(movies[index].id)
  if (getLogo(details.images) === 'None' || getBackdrop(movies[index].backdrop_path) === 'None' || getCertification(details.release_dates.results) === 'None') {
    return await getRandomMovie()
  }
  return movies[index]
}

async function getMovieDetails(movieId) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos%2Cimages%2Ccredits%2Crelease_dates&language=en`, options)
  const { genres, videos, images, credits, release_dates } = await res.json()
  return { genres, videos, images, credits, release_dates }
}

function getBackdrop(src, size) {
  if (src === null) return 'None'
  const backdrop = IMG_URL + BG_SIZE[size || 'md'] + src
  return backdrop
}

function getLogo(images, size) {
  const image = images.logos[0]
  if (image === undefined) return 'None'
  const path = IMG_URL + LOGO_SIZE[size || 'md'] + image.file_path
  return path
}

function getActors(credits) {
  const actors = credits.cast.filter(actor => actor.known_for_department === 'Acting')
  return actors
}

function getCertification(certs) {
  if (!certs || certs.length === 0) return 'None'
  const usCert = certs.find(cert => cert.iso_3166_1 === 'US')
  if (!usCert || !usCert.release_dates || usCert.release_dates.length === 0) return 'None'
  const cert = usCert.release_dates.find(cert => cert.certification !== '')
  if (!cert) return 'None'
  return cert.certification
}

function getTrailer(videos) {
  const trailerData = videos.find(trailer => trailer.type == 'Trailer')
  if (trailerData == undefined) return
  return `https://youtu.be/${trailerData.key}`
}

export { getRandomMovie, getMovieDetails, getBackdrop, getLogo, getActors, getCertification, getTrailer }
