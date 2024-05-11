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

const overview = qs('[data-overview]')
const toggleOverview = toShow => {
  if (toShow) {
    overview.style.display = 'block'
  }
  if (!toShow) {
    overview.removeAttribute('style')
  }
}

$on(overview, 'scroll', e => {
  e.preventDefault()
})
export { qs, qsa, $on, $off, toggleOverview }
