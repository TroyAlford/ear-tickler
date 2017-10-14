export default (array, propName) => {
  const unique = new Set()
  return array.filter((item) => {
    if (unique.has(item[propName])) return false

    unique.add(item[propName])
    return true
  })
}
