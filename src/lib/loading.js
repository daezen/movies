import { qs } from './lib'

class Loading {
  constructor() {
    this.$ = qs('[data-loading]')
  }

  show(text) {
    this.$.classList.add('show-loading')
    this.$.textContent = text
  }
}

const loading = new Loading()

export { loading }
