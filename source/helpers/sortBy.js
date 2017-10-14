export default (propName) => (a, b) => {
  if (a[propName] < b[propName]) return -1
  if (a[propName] > b[propName]) return 1
  return 0
}

