import { qs } from './lib'

class Loading {
  constructor() {
    this.$ = qs('[data-loading]')
  }

  show(text) {
    this.$.classList.add('show-loading')
    this.$.textContent = text
  }

  hide(text) {
    if (text) this.$.textContent = text
    setTimeout(() => {
      this.$.classList.remove('show-loading')
    }, 500)
  }

  message(text) {
    this.show(text)
    this.hide()
  }
}

const loading = new Loading()

export { loading }
