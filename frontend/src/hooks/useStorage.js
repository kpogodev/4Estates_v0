import { useState, useEffect } from 'react'

export function useLocalStorage(key, defualtValue) {
  return useStorage(key, defualtValue, window.localStorage)
}

export function useSessionStorage(key, defualtValue) {
  return useStorage(key, defualtValue, window.sessionStorage)
}

function useStorage(key, defualtValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defualtValue === 'function') {
      return defualtValue()
    } else {
      return defualtValue
    }
  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  return [value, setValue]
}
