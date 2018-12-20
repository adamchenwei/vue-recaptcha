const defer = () => {
  let state = false // Resolved or not
  const callbacks = []
  const resolve = val => {
    if (state) {
      return
    }

    state = true
    for (let i = 0, len = callbacks.length; i < len; i++) {
      console.log('for... ran ', callbacks[i])
      callbacks[i](val)
    }
  }

  const then = cb => {
    console.log('then got called... how?')
    console.log(cb)
    if (!state) {
      callbacks.push(cb)
      return
    }
    cb()
  }

  const deferred = {
    resolved () {
      return state
    },
    resolve,
    promise: {
      then
    }
  }
  return deferred
}

export default defer
