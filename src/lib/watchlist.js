export default class Watchlist {
  constructor($watchlist, $container) {
    this.watchlist = [1, 2, 3]
    this.$watchlist = $watchlist
    this.$container = $container
    // this.render()
  }

  // close() {}

  render() {
    console.log(this.$watchlist)
    this.$watchlist.innerHTML = null
    this.watchlist.forEach(movie => {
      const movieString = `
      <div>
        <div class="h-48 aspect-video border rounded-xl">
          <img src="" alt="" class="bg-zinc-900" />
        </div>
        <p class="text-center">${movie}</p>
      </div>`

      this.$watchlist.innerHTML += movieString
    })
  }
}
