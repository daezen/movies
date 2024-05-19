import { getCertification, getActors } from './apiUtils'
import options from './apiKey'
import { qs } from './lib'

class MovieOverview {
  constructor() {
    this.$ = qs('[data-overview]')
    this.$img = qs('[data-overview-img]')
    this.$trailer = qs('[data-overview-trailer]')
    this.$likes = qs('[data-overview-likes]')
    this.$year = qs('[data-overview-year]')
    this.$rating = qs('[data-overview-rating]')
    this.$duration = qs('[data-overview-duration]')
    this.$description = qs('[data-overview-description]')
    this.$cast = qs('[data-overview-cast]')
    this.$categories = qs('[data-overview-categories]')
    this.$morelike = qs('[data-overview-morelike]')
  }

  toggle(toShow) {
    if (toShow) {
      this.$.classList.add('overview--show')
    }
    if (!toShow) {
      this.setImg('', '')
      this.$.classList.remove('overview--show')
    }
  }

  async update(movieId) {
    setTimeout(async () => {
      const imgUrl = src => `https://image.tmdb.org/t/p/original/${src}`
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos%2Cimages%2Ccredits%2Crelease_dates%2Crecommendations&language=en`, options)
      const data = await res.json()
      const trailerData = data.videos.results.find(trailer => trailer.type == 'Trailer')
      if (trailerData !== undefined) {
        const trailer = `https://youtu.be/${trailerData.key}`
        this.setTrailer(trailer)
      } else this.setTrailer(false)
      if (data.images.backdrops[0] != undefined) {
        this.setImg(imgUrl(data.images.backdrops[0].file_path), 'Movie poster')
      } else this.setImg(imgUrl(data.backdrop_path), 'Movie Poster')
      this.setLikes((Math.round(data.vote_average) / 10) * 100)
      this.setYear(new Date(data.release_date).getFullYear())
      this.setRating(getCertification(data.release_dates.results))
      this.setDescription(data.overview)
      this.setCast(
        getActors(data.credits)
          .map(actor => actor.name)
          .slice(0, 3)
      )
      this.setCategories(data.genres.map(genre => genre.name))
      this.setMorelike(data.recommendations.results)
      this.setDuration(data.runtime)
    }, 400)
  }

  setImg(src, alt) {
    this.$img.src = src
    this.$img.alt = alt
  }

  setTrailer(url) {
    this.$trailer.href = url
  }

  setLikes(likes) {
    this.$likes.textContent = `${likes}%`
  }

  setYear(year) {
    this.$year.textContent = year
  }

  setRating(rating) {
    this.$rating.textContent = rating
  }

  setDuration(duration) {
    const hours = Math.floor(duration / 60)
    const remainingMinutes = duration % 60
    duration = {
      hours,
      remainingMinutes,
    }
    this.$duration.textContent = `${duration.hours}h ${duration.remainingMinutes}m`
  }

  setDescription(description) {
    this.$description.textContent = description
  }

  setCast(cast) {
    this.$cast.innerHTML = ''
    cast.forEach((actor, index) => {
      if (index === 0) return (this.$cast.innerHTML += `<span class="text-zinc-500">Cast: </span>${actor}, `)
      if (index === cast.length - 1) return (this.$cast.innerHTML += `${actor} and <i>more</i>`)
      this.$cast.innerHTML += `${actor}, `
    })
  }

  setCategories(categories) {
    this.$categories.innerHTML = ''
    categories.forEach((category, index) => {
      if (index === 0) return (this.$categories.innerHTML += `<span class="text-zinc-500">Genres: </span>${category}, `)
      if (index === categories.length - 1) return (this.$categories.innerHTML += `${category}`)
      this.$categories.innerHTML += `${category}, `
    })
  }

  setMorelike(movies) {
    movies = movies.filter(movie => movie.backdrop_path !== null).slice(0, 3)
    this.$morelike.innerHTML = ''
    movies.forEach(movie => {
      this.$morelike.innerHTML += `
      <div id="${movie.id}" data-overview-morelike-preview class="aspect-video skeleton h-36 rounded-md  bg-zinc-800 cursor-pointer group">
        <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="${movie.title}" class="mb-2 h-full pointer-events-none" />
        <p class="text-base truncate max-w-[250px] group-hover:text-rose-300 transition">${movie.title}</p>
      </div>`
    })
  }
}

const Overview = new MovieOverview()

export { Overview }
