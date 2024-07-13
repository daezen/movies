import { qs } from './lib.js'
import { getMovie, getBackdrop } from './apiUtils.js'
import { loading } from './loading.js'
const check = `<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>`

class Watchlist {
  constructor() {
    this.watchlist = this.load() || []
    this.$watchlist = qs('[data-watchlist]')
    this.$container = qs('[data-watchlist-container]')
    this.render()
  }

  open() {
    this.render()
    this.$container.classList.remove('hidden')
  }

  close() {
    this.$container.classList.add('hidden')
  }

  async add(movieId) {
    const alreadyAdded = this.watchlist.find(movie => movie.id === movieId)
    if (alreadyAdded !== undefined) return loading.message('Already added')
    if (movieId == null) return loading.hide('Not found')
    loading.show('Adding')
    const movie = await getMovie(movieId)
    this.watchlist.push(movie)
    movie.watched = false
    this.save()
    loading.hide('Added')
  }

  remove(movieId) {
    this.watchlist = this.watchlist.filter(movie => movie.id !== movieId)
    this.save()
    this.render()
  }

  markAsWatched(movieId, $movie) {
    const movie = this.watchlist.find(movie => movie.id === movieId)
    movie.watched = movie.watched ? false : true
    this.save()
    this.render()
  }

  save() {
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist))
  }

  load() {
    return JSON.parse(localStorage.getItem('watchlist'))
  }

  render() {
    this.$watchlist.innerHTML = null
    if (this.watchlist.length === 0) return (this.$watchlist.innerHTML = '<p class="text-center col-span-3 w-full text-zinc-500 mt-28">No movies added yet</p>')
    this.watchlist.forEach(movie => {
      this.$watchlist.innerHTML += this.string(movie.watched, movie)
    })
  }

  string(watched, movie) {
    const stringWatched = `
       <div data-watchlist-movie class="mb-4">
         <div class="relative aspect-video max-md:rounded-lg rounded-xl overflow-hidden bg-zinc-900 mb-2">
          <div class="absolute bg-zinc-950/80 w-full h-full flex items-center justify-center flex-col gap-2 font-extralight text-zinc-300">
            <button data-watchlist-markaswatched class="transition flex items-center gap-1 text-lime-200" id="${movie.id}">Marked as watched<span class="h-5 inline-block">${check}</span></button>
            <button data-watchlist-remove class="hover:text-zinc-50 transition" id="${movie.id}">Remove</button>
          </div>
           <img src="${getBackdrop(movie.backdrop_path)}" alt="${movie.title}" class="rounded-lg" />
         </div>
         <p class="text-center cursor-pointer hover:text-rose-300 transition text-[clamp(10px,2vw,1rem)]">${movie.title}</p>
       </div>`

    const stringUnwatched = `
       <div data-watchlist-movie class="mb-4">
         <div class="relative aspect-video max-md:rounded-lg rounded-xl overflow-hidden bg-zinc-900 mb-2">
          <div class="absolute bg-zinc-950/80 w-full h-full opacity-0 hover:opacity-100 flex items-center justify-center flex-col gap-2 font-extralight text-zinc-300">
            <button data-watchlist-markaswatched class="hover:brightness-110 flex items-center gap-1 transition" id="${movie.id}">Mark as watched</button>
            <button data-watchlist-remove class="hover:text-zinc-50 transition" id="${movie.id}">Remove</button>
          </div>
           <img src="${getBackdrop(movie.backdrop_path)}" alt="${movie.title}" class="rounded-lg" />
         </div>
         <p class="text-center cursor-pointer hover:text-rose-300 transition text-[clamp(10px,2vw,1rem)]">${movie.title}</p>
       </div>`
    if (watched) return stringWatched
    if (!watched) return stringUnwatched
  }
}

const watchlist = new Watchlist()

export { watchlist }
