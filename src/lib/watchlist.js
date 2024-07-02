import { qs } from './lib.js'
import { getMovie, getBackdrop } from './apiUtils.js'

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
    if (alreadyAdded !== undefined) return
    if (movieId == null) return
    const movie = await getMovie(movieId)
    this.watchlist.push(movie)
    this.save()
  }

  remove(movieId) {
    this.watchlist = this.watchlist.filter(movie => movie.id !== movieId)
    this.save()
    this.render()
    console.log(this.watchlist)
  }

  save() {
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist))
  }

  load() {
    return JSON.parse(localStorage.getItem('watchlist'))
  }

  render() {
    this.$watchlist.innerHTML = null
    this.watchlist.forEach(movie => {
      this.$watchlist.innerHTML += `
       <div class="mb-4">
         <div class="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 mb-2 hover">
          <div class="absolute bg-zinc-950/80 w-full h-full opacity-0 hover:opacity-100 transition flex backdrop-blur-md items-center justify-center flex-col gap-2 font-extralight text-zinc-300">
            <button class="hover:text-zinc-50 transition">Watched</button>
            <button data-watchlist-remove class="hover:text-zinc-50 transition" id="${movie.id}">Remove</button>
          </div>
           <img src="${getBackdrop(movie.backdrop_path)}" alt="" class="rounded-lg" />
         </div>
         <p class="text-center cursor-pointer hover:text-rose-300 transition">${movie.title}</p>
       </div>`
    })
  }
}

const watchlist = new Watchlist()
watchlist.open()

export { watchlist }
