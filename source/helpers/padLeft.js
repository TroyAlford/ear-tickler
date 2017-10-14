export default (value, length, padWith = '0') => {
  const padding = [...Array(length)].map(() => padWith).join('')
  return `${padding}${value}`.slice(-length)
}
