import { toggleOverview } from '../lib/helpers.js'

async function locationHandler() {
  const location = window.location.pathname
  if (location.length == 1) {
    toggleOverview(false)
  } else toggleOverview(true)
}

export { locationHandler }
