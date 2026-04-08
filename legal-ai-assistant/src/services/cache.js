const responseCache = new Map()

export function getCachedResponse(question) {
  return responseCache.get(question)
}

export function setCachedResponse(question, answer) {
  responseCache.set(question, answer)
}
