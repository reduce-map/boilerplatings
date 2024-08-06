function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getRandomString = (initialValue = '') => {
  const str = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substring(0, 5)
    .trim()

  return `${initialValue}-${str}`
}

export const sleep = async function (fn, delay, ...args) {
  await timeout(delay)
  return fn(...args)
}
