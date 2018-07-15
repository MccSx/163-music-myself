window.eventHub = {
  events: {},
  //发布
  trigger(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].map((fn) => {
        fn.call(undefined, data)
      })
    }
  },
  
  //订阅
  on(eventName, fn) {
    if (this.events[eventName] === undefined) {
      this.events[eventName] = []
    }
    this.events[eventName].push(fn)
  }
}