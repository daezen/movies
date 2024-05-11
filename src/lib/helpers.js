function qs(selector, scope) {
  return (scope || document).querySelector(selector)
}

function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector)
}

const $on = (target, type, callback, useCapture) => {
  target.addEventListener(type, callback, !!useCapture)
}

const $off = (target, type, callback, useCapture) => {
  target.removeEventListener(type, callback, !!useCapture)
}

const toggleOverview = toShow => {
  const overview = qs('[data-overview]')
  const shadow = qs('[data-shadow]')

  if (toShow) {
    overview.style.display = 'flex'
    shadow.style.display = 'block'
    overview.style.top = window.scrollY
  }
  if (!toShow) {
    overview.removeAttribute('style')
    shadow.removeAttribute('style')
  }
}

export { qs, qsa, $on, $off, toggleOverview }
