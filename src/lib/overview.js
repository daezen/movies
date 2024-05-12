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
      this.$.style.display = 'block'
    }
    if (!toShow) {
      this.$.removeAttribute('style')
    }
  }

  setImg(src, alt) {
    img.src = src
    img.alt = alt
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

  setDescription(description) {
    this.$description.textContent = description
  }

  setCast(cast) {
    this.$cast.innerHTML = ''
    cast.forEach((actor, index) => {
      if (index === 0) return (this.$cast.innerHTML += `<span class="text-zinc-500">Cast: </span>${actor}, `)
      if (index === cast.length - 1) return (this.$cast.innerHTML += `${actor}`)
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
}

const Overview = new MovieOverview()
Overview.toggle(true)

export { Overview }
