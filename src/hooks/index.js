
import * as React from 'react';

export const useLocalStorage = () => {
  const getStoredItem = React.useCallback(
    (key) => {
      let cachedValue = localStorage.getItem(key)
      if (cachedValue === 'undefined') {
        localStorage.removeItem(key)
        cachedValue = null
      }
      return cachedValue
    }, []
  )
  const setStoredItem = React.useCallback(
    (key, value) => {
      localStorage.setItem(key, value)
    }, []
  )
  return {
    getStoredItem,
    setStoredItem,
  }
}
