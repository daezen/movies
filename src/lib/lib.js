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

export { qs, qsa, $on, $off }
