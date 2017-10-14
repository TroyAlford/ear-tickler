import padLeft from './padLeft'

const HOURS = 60*60
const MINUTES = 60

export default (seconds) => {
  const hh = Math.floor(seconds / HOURS)
  const mm = Math.floor((seconds % HOURS) / MINUTES)
  const ss = Math.floor(seconds % MINUTES)

  const parts = []
  if (hh > 0) parts.push(hh)
  parts.push(padLeft(mm, 2), padLeft(ss, 2))

  return parts.join(':')
}
